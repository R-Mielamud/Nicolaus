from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import TagGroup, Tag, Author, Publishing, Series, Status

class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]

class ChangeTagSerializer(ModelSerializer):
    group = PrimaryKeyRelatedField(queryset=TagGroup.objects.all())

    class Meta:
        model = Tag
        fields = ["id", "name", "group"]

class TagGroupSerializer(ModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = TagGroup
        fields = ["id", "name", "tags"]

class ChangeTagGroupSerializer(ModelSerializer):
    class Meta:
        model = TagGroup
        fields = ["id", "name"]

class AuthorSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = ["id", "name"]

class SeriesSerializer(ModelSerializer):
    class Meta:
        model = Series
        fields = ["id", "name"]

class ChangeSeriesSerializer(ModelSerializer):
    publishing = PrimaryKeyRelatedField(queryset=Publishing.objects.all())

    class Meta:
        model = Series
        fields = ["id", "name", "publishing"]

class PublishingSerializer(ModelSerializer):
    class Meta:
        model = Publishing
        fields = ["id", "name"]

class StatusSerializer(ModelSerializer):
    class Meta:
        model = Status
        fields = ["id", "name"]
