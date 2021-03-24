from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    TagAPI,
    TagGroupAPI,
    AuthorAPI,
    SeriesAPI,
    PublishingAPI,
    StatusAPI,
    BulkUpdateAuthorAPI,
    BulkUpdateTagGroupAPI,
    BulkUpdatePublishingAPI,
    BulkUpdateTagAPI,
    BulkUpdateSeriesAPI,
    BulkUpdateStatusesAPI,
    CSVAuthorAPI,
    CSVTagAPI,
    CSVTagGroupAPI,
    CSVPublishingAPI,
    CSVStatusAPI,
    CSVSeriesAPI,
)

tag_groups_router = DefaultRouter()
tag_groups_router.register(r"bulk", BulkUpdateTagGroupAPI, basename="tag_groups")
tag_groups_router.register(r"csv", CSVTagGroupAPI, basename="tag_groups")
tag_groups_router.register(r"", TagGroupAPI)

tags_router = DefaultRouter()
tags_router.register(r"bulk", BulkUpdateTagAPI, basename="tags")
tags_router.register(r"csv", CSVTagAPI, basename="tags")
tags_router.register(r"", TagAPI)

series_router = DefaultRouter()
series_router.register(r"bulk", BulkUpdateSeriesAPI, basename="series")
series_router.register(r"csv", CSVSeriesAPI, basename="series")
series_router.register(r"", SeriesAPI)

publishings_router = DefaultRouter()
publishings_router.register(r"bulk", BulkUpdatePublishingAPI, basename="publishings")
publishings_router.register(r"csv", CSVPublishingAPI, basename="publishings")
publishings_router.register(r"", PublishingAPI)

authors_router = DefaultRouter()
authors_router.register(r"bulk", BulkUpdateAuthorAPI, basename="authors")
authors_router.register(r"csv", CSVAuthorAPI, basename="authors")
authors_router.register(r"", AuthorAPI, basename="authors")

statuses_router = DefaultRouter()
statuses_router.register(r"bulk", BulkUpdateStatusesAPI, basename="statuses")
statuses_router.register(r"csv", CSVStatusAPI, basename="statuses")
statuses_router.register(r"", StatusAPI)

urlpatterns = [
    path("tags/groups/", include(tag_groups_router.urls)),
    path("publishings/series/", include(series_router.urls)),
    path("tags/", include(tags_router.urls)),
    path("publishings/", include(publishings_router.urls)),
    path("authors/", include(authors_router.urls)),
    path("statuses/", include(statuses_router.urls)),
]
