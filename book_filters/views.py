from viewsets import ChangeSerializerViewSet
from .models import Tag, TagGroup

from .serializers import (
    TagSerializer,
    ChangeTagSerializer,
    TagGroupSerializer,
    ChangeTagGroupSerializer,
)

class TagAPI(ChangeSerializerViewSet):
    read_serializer_class = TagSerializer
    write_serializer_class = ChangeTagSerializer
    queryset = Tag.objects.all()

class TagGroupAPI(ChangeSerializerViewSet):
    read_serializer_class = TagGroupSerializer
    write_serializer_class = ChangeTagGroupSerializer
    queryset = TagGroup.objects.all()
