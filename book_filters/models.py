from django.db.models import *
from helpers.csv import CSV
from Nicolaus.base import BaseCSVModel, CSV_CHANGE

class TagGroup(Model, BaseCSVModel):
    name = CharField(max_length=200)
    chosen = BooleanField(default=False)

    def __str__(self):
        return self.name

    @classmethod
    def csv_schema(cls):
        return {
            "id": "ID",
            "name": "Name",
            "chosen": "Chosen",
            "$add$": CSV_CHANGE,
        }

    class Meta:
        ordering = ["-chosen"]

class Tag(Model, BaseCSVModel):
    id_to_relation = {"group": TagGroup}
    name = CharField(max_length=200)
    group = ForeignKey(to=TagGroup, related_name="tags", on_delete=CASCADE)

    def __str__(self):
        return self.name

    @classmethod
    def csv_schema(cls):
        return {
            "id": "ID",
            "name": "Name",
            "group.id": "Group",
            "$add$": CSV_CHANGE,
        }

    class Meta:
        ordering = ["name"]

class Author(Model, BaseCSVModel):
    name = CharField(max_length=100)
    chosen = BooleanField(default=False)

    def __str__(self):
        return self.name

    @classmethod
    def csv_schema(cls):
        return {
            "id": "ID",
            "name": "Name",
            "chosen": "Chosen",
            "$add$": CSV_CHANGE,
        }

    class Meta:
        ordering = ["name"]

class Publishing(Model, BaseCSVModel):
    name = CharField(max_length=200)

    def __str__(self):
        return self.name

    @classmethod
    def csv_schema(cls):
        return {
            "id": "ID",
            "name": "Name",
            "$add$": CSV_CHANGE,
        }

    class Meta:
        ordering = ["name"]

class Series(Model, BaseCSVModel):
    id_to_relation = {"publishing": Publishing}
    name = CharField(max_length=200)
    publishing = ForeignKey(to=Publishing, related_name="series", on_delete=CASCADE)

    def __str__(self):
        return self.name

    @classmethod
    def csv_schema(cls):
        return {
            "id": "ID",
            "name": "Name",
            "publishing.id": "Publishing",
            "$add$": CSV_CHANGE,
        }

    class Meta:
        verbose_name_plural = "series"


class Status(Model, BaseCSVModel):
    name = CharField(max_length=200)

    def __str__(self):
        return self.name

    @classmethod
    def csv_schema(cls):
        return {
            "id": "ID",
            "name": "Name",
            "$add$": CSV_CHANGE,
        }

    class Meta:
        verbose_name_plural = "statuses"
