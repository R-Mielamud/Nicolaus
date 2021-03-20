from django.db.models import *
from books.models import Book

class BillableMixin:
    total_price = FloatField()

    def recalculate_price(self):
        self.total_price = sum(map(lambda b: b.price, self.books))

    def save(self, *args, **kwargs):
        self.recalculate_price()
        return super().save(*args, **kwargs)

class Cart(Model, BillableMixin):
    pass

class Order(Model, BillableMixin):
    billed = BooleanField(default=False)
    user = ForeignKey(to="authorization.User", on_delete=CASCADE, related_name="orders")

    def recalculate_price(self):
        if self.billed:
            return super().recalculate_price()

class InstanceBook(Model):
    book = ForeignKey(to=Book, on_delete=CASCADE, related_name="instances")
    cart = ForeignKey(to=Cart, on_delete=CASCADE, related_name="books", blank=True, null=True)
    order = ForeignKey(to=Order, on_delete=CASCADE, related_name="books", blank=True, null=True)
    count = IntegerField(default=1)

    def save(self, *args, **kwargs):
        result = super().save(*args, **kwargs)

        if not self.order and not self.cart:
            self.delete()

        return result
