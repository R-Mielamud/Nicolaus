from rest_framework.viewsets import ModelViewSet
from Nicolaus.base import BaseCSVExportAPI, BaseBulkUpdateAPI
from viewsets import ChangeSerializerViewSet
from .models import Tag, TagGroup, Author, Series, Publishing, Status

from .celery import (
    bulk_update_authors,
    bulk_update_tag_groups,
    bulk_update_publishings,
    bulk_update_tags,
    bulk_update_series,
    bulk_update_statuses,
)

from .serializers import (
    TagSerializer,
    ChangeTagSerializer,
    TagGroupSerializer,
    ChangeTagGroupSerializer,
    AuthorSerializer,
    ChangeAuthorSerializer,
    SeriesSerializer,
    ChangeSeriesSerializer,
    PublishingSerializer,
    StatusSerializer,
)

class TagAPI(ChangeSerializerViewSet):
    for_admin = True
    read_serializer_class = TagSerializer
    write_serializer_class = ChangeTagSerializer
    queryset = Tag.objects.all()

class TagGroupAPI(ChangeSerializerViewSet):
    for_admin = True
    read_serializer_class = TagGroupSerializer
    write_serializer_class = ChangeTagGroupSerializer
    queryset = TagGroup.objects.all()

class AuthorAPI(ChangeSerializerViewSet):
    for_admin = True
    read_serializer_class = AuthorSerializer
    write_serializer_class = ChangeAuthorSerializer

    def get_queryset(self):
        if self.request.GET.get("admin") == "1" or self.action != "list":
            return Author.objects.all()
        else:
            return Author.objects.filter(chosen=True)

class SeriesAPI(ChangeSerializerViewSet):
    for_admin = True
    read_serializer_class = SeriesSerializer
    write_serializer_class = ChangeSeriesSerializer
    queryset = Series.objects.all()

class PublishingAPI(ModelViewSet):
    serializer_class = PublishingSerializer
    queryset = Publishing.objects.all()

class StatusAPI(ModelViewSet):
    serializer_class = StatusSerializer
    queryset = Status.objects.all()

class BulkUpdateAuthorAPI(BaseBulkUpdateAPI):
    serializer_class = ChangeAuthorSerializer

    def create(self, request, *args, **kwargs):
        return self.get_create(bulk_update_authors, request, *args, **kwargs)

class BulkUpdateTagGroupAPI(BaseBulkUpdateAPI):
    serializer_class = ChangeTagGroupSerializer

    def create(self, request, *args, **kwargs):
        return self.get_create(bulk_update_tag_groups, request, *args, **kwargs)

class BulkUpdatePublishingAPI(BaseBulkUpdateAPI):
    serializer_class = PublishingSerializer

    def create(self, request, *args, **kwargs):
        return self.get_create(bulk_update_publishings, request, *args, **kwargs)

class BulkUpdateTagAPI(BaseBulkUpdateAPI):
    serializer_class = ChangeTagSerializer

    def create(self, request, *args, **kwargs):
        return self.get_create(bulk_update_tags, request, *args, **kwargs)

class BulkUpdateSeriesAPI(BaseBulkUpdateAPI):
    serializer_class = ChangeTagSerializer

    def create(self, request, *args, **kwargs):
        return self.get_create(bulk_update_series, request, *args, **kwargs)

class BulkUpdateStatusesAPI(BaseBulkUpdateAPI):
    serializer_class = StatusSerializer

    def create(self, request, *args, **kwargs):
        return self.get_create(bulk_update_statuses, request, *args, **kwargs)

class CSVTagAPI(BaseCSVExportAPI):
    model = Tag

class CSVTagGroupAPI(BaseCSVExportAPI):
    model = TagGroup

class CSVAuthorAPI(BaseCSVExportAPI):
    model = Author

class CSVSeriesAPI(BaseCSVExportAPI):
    model = Series

class CSVPublishingAPI(BaseCSVExportAPI):
    model = Publishing

class CSVStatusAPI(BaseCSVExportAPI):
    model = Status
