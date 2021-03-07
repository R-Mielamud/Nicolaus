from rest_framework.viewsets import ModelViewSet

class ChangeSerializerViewSet(ModelViewSet):
    for_admin = False

    def get_serializer_class(self):
        if ((self.action == "list" or self.action == "retrieve") and
                not (self.for_admin and self.request.GET.get("admin") == "1")):
            return self.read_serializer_class
        else:
            return self.write_serializer_class
