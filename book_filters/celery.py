from Nicolaus.celery import app

def bulk_update_model(Model, dataset, can_create=True):
    fields = [f.name for f in Model._meta.get_fields()]
    fetch_relations = None
    fetch_m2m = None

    if hasattr(Model, "id_to_relation"):
        fetch_relations = getattr(Model, "id_to_relation")

    if hasattr(Model, "id_to_m2m"):
        fetch_m2m = getattr(Model, "id_to_m2m")

    for datai in dataset:
        f_id = datai.get("id")
        change = datai.get("change")
        copy = datai.copy()

        if fetch_relations:
            for name, Relation in fetch_relations.items():
                pk = datai.get(name)

                if pk is not None:
                    copy[name] = Relation.objects.filter(pk=pk).first()

        for key in datai:
            if key not in fields:
                del copy[key]

        datai = copy.copy()

        if not f_id and can_create:
            Model.objects.create(**datai)
            continue

        if change == 1:
            try:
                filter_obj = Model.objects.filter(pk=f_id)

                if len(filter_obj) <= 0:
                    continue

                update_data = datai.copy()

                if fetch_m2m:
                    for key, Relation in fetch_m2m.items():
                        ids = datai.get(key)

                        if type(ids) == int:
                            ids = [ids]

                        if ids is not None:
                            objects = []

                            for pk in ids:
                                objects.append(Relation.objects.filter(pk=pk).first())

                            getattr(filter_obj.first(), key).set(objects)
                            del update_data[key]

                filter_obj.update(**update_data)
            except:
                pass

@app.task()
def bulk_update_authors(dataset):
    from .models import Author
    bulk_update_model(Author, dataset)

@app.task()
def bulk_update_tag_groups(dataset):
    from .models import TagGroup
    bulk_update_model(TagGroup, dataset)

@app.task()
def bulk_update_publishings(dataset):
    from .models import Publishing
    bulk_update_model(Publishing, dataset)

@app.task()
def bulk_update_tags(dataset):
    from .models import Tag
    bulk_update_model(Tag, dataset)

@app.task()
def bulk_update_series(dataset):
    from .models import Series
    bulk_update_model(Series, dataset)

@app.task()
def bulk_update_statuses(dataset):
    from .models import Status
    bulk_update_model(Status, dataset)
