from rest_framework.serializers import (
    ModelSerializer,
    SerializerMethodField,
    PrimaryKeyRelatedField,
)

from book_filters.models import Tag
from book_filters.serializers import TagSerializer
from .models import Book

class CommonBookSerializer(ModelSerializer):
    is_in_stock = SerializerMethodField()

    def get_is_in_stock(self, obj):
        return obj.in_stock > 0

class ListBookSerializer(CommonBookSerializer):
    # authors = ...

    class Meta:
        model = Book

        fields = [
            "id",
            "title",
            "description",
            "image",
            # "authors",
            "price",
            "discount",
        ]

class BookSerializer(CommonBookSerializer):
    # authors = ...
    # publishing = ...
    # series = ...
    tags = TagSerializer(many=True)

    class Meta:
        model = Book

        fields = [
            "id",
            "title",
            "description",
            "image",
            # "authors",
            # "publishing",
            # "series",
            "isbn",
            "price",
            "discount",
            "pages_count",
            "paper_type",
            "tags",
        ]

class ChangeBookSerializer(ModelSerializer):
    # authors = ...
    # publishing = ...
    # series = ...
    tags = PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all())

    class Meta:
        model = Book

        fields = [
            "title",
            "description",
            "image",
            # "authors",
            # "publishing",
            # "series",
            "isbn",
            "orig_price",
            "discount",
            "pages_count",
            "paper_type",
            "tags",
        ]
