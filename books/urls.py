from django.urls import path, include

urlpatterns = [
    path("filters/", include("book_filters.urls")),
]
