from rest_framework.serializers import (
    ModelSerializer,
    SerializerMethodField,
    PrimaryKeyRelatedField,
)

from book_filters.serializers import (
    TagSerializer,
    AuthorSerializer,
    PublishingSerializer,
    SeriesSerializer,
    StatusSerializer,
)

from book_filters.models import Tag, Author, Series, Publishing, Status
from .models import Book

class CommonBookSerializer(ModelSerializer):
    is_in_stock = SerializerMethodField()

    def get_is_in_stock(self, obj):
        return obj.in_stock > 0

class ListBookSerializer(CommonBookSerializer):
    authors = AuthorSerializer(many=True)
    status = StatusSerializer()

    class Meta:
        model = Book

        fields = [
            "id",
            "title",
            "image",
            "authors",
            "status",
            "price",
            "orig_price",
            "discount",
            "is_in_stock",
        ]

class BookSerializer(CommonBookSerializer):
    authors = AuthorSerializer(many=True)
    publishing = PublishingSerializer()
    series = SeriesSerializer()
    tags = TagSerializer(many=True)
    status = StatusSerializer()

    class Meta:
        model = Book

        fields = [
            "id",
            "title",
            "description",
            "image",
            "authors",
            "publishing",
            "series",
            "status",
            "isbn",
            "price",
            "orig_price",
            "discount",
            "pages_count",
            "paper_type",
            "is_in_stock",
            "tags",
        ]

class ChangeBookSerializer(ModelSerializer):
    authors = PrimaryKeyRelatedField(many=True, queryset=Author.objects.all())
    publishing = PrimaryKeyRelatedField(queryset=Publishing.objects.all())
    series = PrimaryKeyRelatedField(queryset=Series.objects.all())
    tags = PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all())
    status = PrimaryKeyRelatedField(queryset=Status.objects.all())

    class Meta:
        model = Book

        fields = [
            "id",
            "title",
            "description",
            "status",
            "image",
            "authors",
            "publishing",
            "series",
            "isbn",
            "orig_price",
            "discount",
            "pages_count",
            "paper_type",
            "in_stock",
            "chosen",
            "tags",
        ]
