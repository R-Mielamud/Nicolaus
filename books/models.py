from django.db.models import *
from Nicolaus.base import BaseCSVModel, CSV_CHANGE, csv_map_instances_ids
from book_filters.models import Tag, Author, Series, Publishing, Status
from storages import S3BookImageStorage
from helpers.percentage import get_percent_of_number

class Book(Model, BaseCSVModel):
    id_to_m2m = {"authors": Author, "tags": Tag}
    title = CharField(max_length=300)
    description = TextField(max_length=3000, blank=True, null=True)
    image = ImageField(storage=S3BookImageStorage())
    authors = ManyToManyField(to=Author, related_name="books")
    publishing = ForeignKey(to=Publishing, related_name="books", on_delete=SET_NULL, blank=True, null=True)
    series = ForeignKey(to=Series, related_name="books", on_delete=SET_NULL, blank=True, null=True)
    status = ForeignKey(to=Status, related_name="books", on_delete=SET_NULL, blank=True, null=True)
    isbn = CharField(max_length=100)
    price = FloatField(default=0)
    orig_price = FloatField(default=0)
    discount = IntegerField(default=0)
    in_stock = IntegerField(default=0)
    pages_count = IntegerField(default=100)
    paper_type = CharField(max_length=100)
    chosen = BooleanField(default=False)
    tags = ManyToManyField(to=Tag, related_name="books", blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        new_price = self.orig_price - get_percent_of_number(self.orig_price, self.discount)
        self.price = round(new_price)

        return super().save(*args, **kwargs)

    @classmethod
    def csv_schema(cls):
        return {
            "id": "ID",
            "title": "Title",
            "description": "Description",
            "authors": "Authors",
            "publishing.id": "Publishing",
            "series.id": "Series",
            "status.id": "Status",
            "isbn": "ISBN",
            "orig_price": "Price",
            "discount": "Discount",
            "in_stock": "Count in stock",
            "pages_count": "Pages count",
            "paper_type": "Paper type",
            "tags": "Tags",
            "chosen": "Chosen",
            "$add$": CSV_CHANGE,
        }

    @classmethod
    def csv_dto(cls, instance):
        return {
            "id": instance.pk,
            "title": instance.title,
            "description": instance.description,
            "authors": csv_map_instances_ids(instance.authors.all()),
            "publishing": instance.publishing,
            "series": instance.series,
            "status": instance.status,
            "isbn": instance.isbn,
            "orig_price": instance.orig_price,
            "discount": instance.discount,
            "in_stock": instance.in_stock,
            "pages_count": instance.pages_count,
            "paper_type": instance.paper_type,
            "tags": csv_map_instances_ids(instance.tags.all()),
            "chosen": instance.chosen,
        }

    class Meta:
        ordering = ["-chosen"]
