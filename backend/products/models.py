from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    price = models.DecimalField(decimal_places=2, max_digits=20)

    def __str__(self):
        return f'{self.name} - {self.price}'
