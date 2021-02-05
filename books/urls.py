from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookAPI

router = DefaultRouter()
router.register(r"", BookAPI)

urlpatterns = [
    path("filters/", include("book_filters.urls")),
    path("", include(router.urls))
]
