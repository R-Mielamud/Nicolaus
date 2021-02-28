from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TagAPI, TagGroupAPI, AuthorAPI, SeriesAPI, PublishingAPI, StatusAPI, BulkUpdateAuthorAPI, BulkUpdateTagGroupAPI

tags_router = DefaultRouter()
tags_router.register(r"groups/bulk", BulkUpdateTagGroupAPI, basename="tag_groups")
tags_router.register(r"groups", TagGroupAPI)
tags_router.register(r"", TagAPI)

publishings_router = DefaultRouter()
publishings_router.register(r"series", SeriesAPI)
publishings_router.register(r"", PublishingAPI, basename="publishings")

authors_router = DefaultRouter()
authors_router.register(r"bulk", BulkUpdateAuthorAPI, basename="authors")
authors_router.register(r"", AuthorAPI, basename="authors")

statuses_router = DefaultRouter()
statuses_router.register(r"", StatusAPI)

urlpatterns = [
    path("tags/", include(tags_router.urls)),
    path("publishings/", include(publishings_router.urls)),
    path("authors/", include(authors_router.urls)),
    path("statuses/", include(statuses_router.urls)),
]
