from django.db.models import *

class TagGroup(Model):
    name = CharField(max_length=200)

    def __str__(self):
        return self.name

class Tag(Model):
    name = CharField(max_length=200)
    group = ForeignKey(to=TagGroup, related_name="tags", on_delete=CASCADE)

    def __str__(self):
        return self.name
