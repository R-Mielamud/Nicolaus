from django.http import JsonResponse, HttpResponse
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin, ListModelMixin
from helpers.csv import CSV

class BaseBulkUpdateAPI(CreateModelMixin, GenericViewSet):
    def get_create(self, action, request, *args, **kwargs):
        data = request.data

        try:
            action.delay(data)
        except:
            return JsonResponse({ "message": "Request format is incorrect" }, status=400)

        return JsonResponse({ "success": True }, status=201)

class BaseCSVModel:
    @classmethod
    def csv_dto(cls, instance):
        return instance

    @classmethod
    def csv(cls):
        instances = tuple(map(lambda i: cls.csv_dto(i), cls.objects.all()))
        exporter = CSV(cls.csv_schema(), instances)

        return exporter.generate()

class BaseCSVExportAPI(ListModelMixin, GenericViewSet):
    def list(self, request, *args, **kwargs):
        return HttpResponse(self.model.csv())

def csv_map_instances_ids(instances):
    return tuple(map(lambda i: str(i.id), instances))

CSV_CHANGE = {
    "Change": False,
}
