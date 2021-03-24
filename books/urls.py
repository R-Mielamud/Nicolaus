from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookAPI, RecommendationsAPI, BulkUpdateBookAPI, CSVBookAPI

router = DefaultRouter()
router.register(r"recommendations", RecommendationsAPI, basename="books")
router.register(r"bulk", BulkUpdateBookAPI, basename="books")
router.register(r"csv", CSVBookAPI, basename="books")
router.register(r"", BookAPI, basename="books")

urlpatterns = [
    path("filters/", include("book_filters.urls")),
    path("", include(router.urls))
]
