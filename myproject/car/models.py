# Create your models here.
from django.db import models
from django.db import models
from datetime import timedelta


class Car(models.Model):
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    model_year = models.IntegerField()
    is_available = models.BooleanField(default=True)
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    image = models.ImageField(upload_to='car_images/', null=True, blank=True)
    description = models.TextField()

    def __str__(self):
        return f"{self.brand} {self.name} ({self.model_year})"

class Rental(models.Model):
    car = models.ForeignKey('Car', on_delete=models.CASCADE)
    renter_name = models.CharField(max_length=100)
    renter_email = models.EmailField()
    start_date = models.DateField()
    end_date = models.DateField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2, editable=False)

    def save(self, *args, **kwargs):
        rental_days = (self.end_date - self.start_date).days + 1
        self.total_price = rental_days * self.car.price_per_day
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Rental: {self.car.name} to {self.renter_name}"
