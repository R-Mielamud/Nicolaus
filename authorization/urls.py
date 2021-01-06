from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterAPIView, UpdateAPIView, LoginAPIView

urlpatterns = [
    path("register/", RegisterAPIView.as_view()),
    path("login/", LoginAPIView.as_view()),
    path("update/", UpdateAPIView.as_view()),
]
