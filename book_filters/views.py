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
    ChangePublishingSerializer,
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
    queryset = Author.objects.all()

class SeriesAPI(ChangeSerializerViewSet):
    read_serializer_class = SeriesSerializer
    write_serializer_class = ChangeSeriesSerializer
    queryset = Series.objects.all()

class PublishingAPI(ChangeSerializerViewSet):
    read_serializer_class = PublishingSerializer
    write_serializer_class = ChangePublishingSerializer
    queryset = Publishing.objects.all()
