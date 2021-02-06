from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TagAPI, TagGroupAPI, AuthorAPI, SeriesAPI, PublishingAPI

tags_router = DefaultRouter()
tags_router.register(r"groups", TagGroupAPI)
tags_router.register(r"", TagAPI)

publishings_router = DefaultRouter()
publishings_router.register(r"series", SeriesAPI)
publishings_router.register(r"", PublishingAPI)

authors_router = DefaultRouter()
authors_router.register(r"", AuthorAPI)

urlpatterns = [
    path("tags/", include(tags_router.urls)),
    path("publishings/", include(publishings_router.urls)),
    path("authors/", include(authors_router.urls)),
]
