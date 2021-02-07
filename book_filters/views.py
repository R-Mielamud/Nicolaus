from rest_framework.viewsets import ModelViewSet
from viewsets import ChangeSerializerViewSet
from .models import Tag, TagGroup, Author, Series, Publishing

from .serializers import (
    TagSerializer,
    ChangeTagSerializer,
    TagGroupSerializer,
    ChangeTagGroupSerializer,
    AuthorSerializer,
    SeriesSerializer,
    ChangeSeriesSerializer,
    PublishingSerializer,
)

class TagAPI(ChangeSerializerViewSet):
    read_serializer_class = TagSerializer
    write_serializer_class = ChangeTagSerializer
    queryset = Tag.objects.all()

class TagGroupAPI(ChangeSerializerViewSet):
    read_serializer_class = TagGroupSerializer
    write_serializer_class = ChangeTagGroupSerializer
    queryset = TagGroup.objects.all()

class AuthorAPI(ModelViewSet):
    serializer_class = AuthorSerializer

    def get_queryset(self):
        if self.request.GET.get("all") == "True":
            return Author.objects.all()
        else:
            return Author.objects.filter(favorite=True)

class SeriesAPI(ChangeSerializerViewSet):
    read_serializer_class = SeriesSerializer
    write_serializer_class = ChangeSeriesSerializer
    queryset = Series.objects.all()

class PublishingAPI(ModelViewSet):
    serializer_class = PublishingSerializer
    queryset = Publishing.objects.all()
