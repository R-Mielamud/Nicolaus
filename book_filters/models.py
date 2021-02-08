from django.db.models import *

class TagGroup(Model):
    name = CharField(max_length=200)
    favorite = BooleanField(default=False)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-favorite"]

class Tag(Model):
    name = CharField(max_length=200)
    group = ForeignKey(to=TagGroup, related_name="tags", on_delete=CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]

class Author(Model):
    name = CharField(max_length=100)
    favorite = BooleanField(default=False)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]

class Publishing(Model):
    name = CharField(max_length=200)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]

class Series(Model):
    name = CharField(max_length=200)
    publishing = ForeignKey(to=Publishing, related_name="series", on_delete=CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "series"


class Status(Model):
    name = CharField(max_length=200)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "statuses"
