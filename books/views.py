from random import shuffle
from django.db.models import Q
from django.http import JsonResponse
from rest_framework.mixins import ListModelMixin
from rest_framework.viewsets import GenericViewSet
from viewsets import ChangeSerializerViewSet
from .models import Book

from .serlializers import (
    ListBookSerializer,
    BookSerializer,
    ChangeBookSerializer,
)

class BookAPI(ChangeSerializerViewSet):
    for_admin = True
    read_serializer_class = BookSerializer
    write_serializer_class = ChangeBookSerializer

    def get_serializer_class(self):
        if self.action == "list":
            return ListBookSerializer

        return super().get_serializer_class()

    def get_queryset(self):
        def result(data, has_more = False):
            return {
                "data": data,
                "has_more": has_more,
            }

        if self.action != "list":
            return Book.objects.all()

        offset = self.request.GET.get("from")
        limit = self.request.GET.get("limit")

        if offset and offset.isdigit():
            offset = int(offset)
        else:
            offset = None

        if limit and limit.isdigit():
            limit = int(limit)
        else:
            limit = None

        publishings_query = Q()
        series_query = Q()
        authors_query = Q()
        tags_query = Q()
        statuses_query = Q()
        text_query = Q()

        if self.request.GET.get("admin") != "1":
            search = self.request.GET.get("search")
            tags = self.request.GET.get("tags")
            publishings = self.request.GET.get("publishings")
            series = self.request.GET.get("series")
            authors = self.request.GET.get("authors")
            statuses = self.request.GET.get("statuses")

            text_search_fields = ["title", "authors__name", "series__name", "publishing__name"]

            if search:
                words = search.strip().split(" ")

                for field in text_search_fields:
                    for word in words:
                        text_query |= Q(**{ field + "__icontains": word })

            if publishings:
                pub_ids = publishings.strip().split(",")
                publishings_query &= Q(publishing__in=pub_ids)

            if series:
                series_ids = series.strip().split(",")
                series_query &= Q(series__in=series_ids)

            if authors:
                author_ids = authors.strip().split(",")
                authors_query &= Q(authors__in=author_ids)

            if statuses:
                status_ids = statuses.strip().split(",")
                statuses_query &= Q(status__in=status_ids)

            tags_filtered_queryset = None

            if tags:
                tag_ids = tags.strip().split(",")

                for tag_id in tag_ids:
                    if not tag_id.isdigit():
                        continue

                    new_queryset = Book.objects.filter(tags=tag_id)

                    if not tags_filtered_queryset:
                        tags_filtered_queryset = new_queryset
                    else:
                        tags_filtered_queryset &= new_queryset
        else:
            name = self.request.GET.get("name")
            tags_filtered_queryset = None

            if name:
                tags_filtered_queryset = Book.objects.filter(title__icontains=name)

        if tags_filtered_queryset is None:
            tags_filtered_queryset = Book.objects.all()

        query = publishings_query & series_query & authors_query & tags_query & statuses_query & text_query
        queryset = tags_filtered_queryset.filter(query).distinct()

        has_more = False

        if limit:
            has_more = queryset.count() > offset + limit

        if offset and limit:
            return result(queryset[offset:offset + limit], has_more)
        elif offset:
            return result(queryset[offset:], has_more)
        elif limit:
            return result(queryset[:limit], has_more)

        return result(queryset, has_more)

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset["data"], many=True)

        return JsonResponse({
            "has_more": queryset["has_more"],
            "books": serializer.data,
        })

class RecommendationsAPI(ListModelMixin, GenericViewSet):
    serializer_class = ListBookSerializer

    def get_queryset(self):
        exclude = self.request.GET.get("exclude")
        count = 4
        book_filter = Q(status__isnull=False)

        if exclude:
            book_filter &= ~Q(pk=exclude)

        with_status = list(Book.objects.filter(book_filter))
        shuffle(with_status)

        return with_status[0:count]
