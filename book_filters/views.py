from django.http import JsonResponse
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin
from viewsets import ChangeSerializerViewSet
from .models import Tag, TagGroup, Author, Series, Publishing, Status
from .celery import bulk_update_authors

from .serializers import (
    TagSerializer,
    ChangeTagSerializer,
    TagGroupSerializer,
    ChangeTagGroupSerializer,
    AuthorSerializer,
    ChangeAuthorSerializer,
    SeriesSerializer,
    ChangeSeriesSerializer,
    PublishingSerializer,
    StatusSerializer,
)

class TagAPI(ChangeSerializerViewSet):
    for_admin = True
    read_serializer_class = TagSerializer
    write_serializer_class = ChangeTagSerializer
    queryset = Tag.objects.all()

class TagGroupAPI(ChangeSerializerViewSet):
    for_admin = True
    read_serializer_class = TagGroupSerializer
    write_serializer_class = ChangeTagGroupSerializer
    queryset = TagGroup.objects.all()

class AuthorAPI(ChangeSerializerViewSet):
    for_admin = True
    read_serializer_class = AuthorSerializer
    write_serializer_class = ChangeAuthorSerializer

    def get_queryset(self):
        if self.request.GET.get("admin") == "1" or self.action != "list":
            return Author.objects.all()
        else:
            return Author.objects.filter(chosen=True)

class BulkUpdateAuthorAPI(CreateModelMixin, GenericViewSet):
    serializer_class = ChangeAuthorSerializer

    def create(self, request, *args, **kwargs):
        data = request.data

        try:
            bulk_update_authors.delay(data)
        except:
            return JsonResponse({ "message": "Request format is incorrect" }, status=400)

        return JsonResponse({ "success": True }, status=201)

class SeriesAPI(ChangeSerializerViewSet):
    for_admin = True
    read_serializer_class = SeriesSerializer
    write_serializer_class = ChangeSeriesSerializer
    queryset = Series.objects.all()

class PublishingAPI(ModelViewSet):
    serializer_class = PublishingSerializer
    queryset = Publishing.objects.all()

class StatusAPI(ModelViewSet):
    serializer_class = StatusSerializer
    queryset = Status.objects.all()
