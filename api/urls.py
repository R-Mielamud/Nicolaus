from django.urls import path, include

urlpatterns = [
    path("user/", include("authorization.urls")),
    path("books/", include("books.urls")),
]
