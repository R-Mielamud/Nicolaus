from viewsets import ChangeSerializerViewSet
from .models import Book

from .serlializers import (
    ListBookSerializer,
    BookSerializer,
    ChangeBookSerializer,
)

class BookAPI(ChangeSerializerViewSet):
    read_serializer_class = BookSerializer
    write_serializer_class = ChangeBookSerializer
    queryset = Book.objects.all()

    def get_serializer_class(self):
        if self.action == "list":
            return ListBookSerializer

        return super().get_serializer_class()
