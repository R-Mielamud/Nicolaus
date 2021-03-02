from Nicolaus.celery import app

def bulk_update_filter(Model, dataset):
    fields = [f.name for f in Model._meta.get_fields()]
    fetch_relations = getattr(Model, "id_to_relation")

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

        if not f_id:
            Model.objects.create(**datai)
            continue

        if change == 1:
            try:
                filter_obj = Model.objects.filter(pk=f_id)

                if len(filter_obj) <= 0:
                    continue

                filter_obj.update(**datai)
            except:
                pass

@app.task()
def bulk_update_authors(dataset):
    from .models import Author
    bulk_update_filter(Author, dataset)

@app.task()
def bulk_update_tag_groups(dataset):
    from .models import TagGroup
    bulk_update_filter(TagGroup, dataset)

@app.task()
def bulk_update_publishings(dataset):
    from .models import Publishing
    bulk_update_filter(Publishing, dataset)

@app.task()
def bulk_update_tags(dataset):
    from .models import Tag
    bulk_update_filter(Tag, dataset)
