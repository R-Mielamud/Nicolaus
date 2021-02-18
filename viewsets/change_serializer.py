from rest_framework.viewsets import ModelViewSet

class ChangeSerializerViewSet(ModelViewSet):
    def get_serializer_class(self):
        if self.action == "list" or self.action == "retrieve":
            return self.read_serializer_class
        else:
            return self.write_serializer_class
