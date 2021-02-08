from django.contrib import admin
from .models import TagGroup, Tag, Publishing, Author, Series, Status

admin.site.register(TagGroup)
admin.site.register(Tag)
admin.site.register(Publishing)
admin.site.register(Author)
admin.site.register(Series)
admin.site.register(Status)
