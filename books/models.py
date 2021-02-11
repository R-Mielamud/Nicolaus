from django.db.models import *
from book_filters.models import Tag, Author, Series, Publishing, Status
from storages import S3BookImageStorage
from helpers.percentage import get_percent_of_number

class Book(Model):
    title = CharField(max_length=300)
    description = TextField(max_length=3000, blank=True, null=True)
    image = FileField(storage=S3BookImageStorage())
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
    favorite = BooleanField(default=False)
    tags = ManyToManyField(to=Tag, related_name="books", blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.price = self.orig_price - get_percent_of_number(self.orig_price, self.discount)
        return super().save(*args, **kwargs)
