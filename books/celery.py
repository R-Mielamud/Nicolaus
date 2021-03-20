from Nicolaus.celery import app
from book_filters.celery import bulk_update_model

@app.task()
def bulk_update_books(dataset):
    from .models import Book
    bulk_update_model(Book, dataset, False)

@app.task()
def recalculate_instances_price(book):
    for instance in book.instances.all():
        if instance.cart:
            instance.cart.recalculate_price()

        if instance.order:
            instance.order.recalculate_price()
