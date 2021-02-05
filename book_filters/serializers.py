from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import TagGroup, Tag

class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]

class ChangeTagSerializer(ModelSerializer):
    group = PrimaryKeyRelatedField(queryset=TagGroup.objects.all())

    class Meta:
        model = Tag
        fields = ["name", "group"]

class TagGroupSerializer(ModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = TagGroup
        fields = ["id", "name", "tags"]

class ChangeTagGroupSerializer(ModelSerializer):
    class Meta:
        model = TagGroup
        fields = ["id", "name"]
