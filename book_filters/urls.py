from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TagAPI, TagGroupAPI

tags_router = DefaultRouter()
tags_router.register(r"groups", TagGroupAPI)
tags_router.register(r"", TagAPI)

urlpatterns = [
    path("tags/", include(tags_router.urls)),
]
