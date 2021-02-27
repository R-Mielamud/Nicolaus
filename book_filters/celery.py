from Nicolaus.celery import app

def bulk_update_filter(Model, dataset):
    fields = [f.name for f in Model._meta.get_fields()]

    for datai in dataset:
        f_id = datai.get("id")
        change = datai.get("change")
        copy = datai.copy()

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

                if not filter_obj:
                    continue

                filter_obj.update(**datai)
            except:
                pass

@app.task()
def bulk_update_authors(dataset):
    from .models import Author
    bulk_update_filter(Author, dataset)
