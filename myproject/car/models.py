# Create your models here.
from django.db import models
from reportlab.pdfgen import canvas
from django.http import HttpResponse
import io

class Car(models.Model):
    name = models.CharField(max_length=100)
    make = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    model_year = models.IntegerField()
    is_available = models.BooleanField(default=True)
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    image = models.ImageField(upload_to='car_images/', null=True, blank=True)
    description = models.TextField()
    passengers = models.IntegerField(default=4)
    luggage_large = models.IntegerField(default=1)
    luggage_small = models.IntegerField(default=2)
    doors = models.IntegerField(default=4)
    transmission = models.CharField(max_length=20, choices=[('manual', 'Manual'), ('automatic', 'Automatic')], default='manual')
    air_conditioning = models.BooleanField(default=False)
    power_steering = models.BooleanField(default=False)
    
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

    def generate_invoice_pdf(self):
        buffer = io.BytesIO()
        p = canvas.Canvas(buffer)
        p.drawString(100, 800, f"Invoice for Rental ID: {self.id}")
        p.drawString(100, 780, f"Renter Name: {self.renter_name}")
        p.drawString(100, 760, f"Email: {self.renter_email}")
        p.drawString(100, 740, f"Car: {self.car.name}")
        p.drawString(100, 720, f"Rental Period: {self.start_date} to {self.end_date}")
        p.drawString(100, 700, f"Total Price: R{self.total_price}")
        p.showPage()
        p.save()
        buffer.seek(0)
        return buffer

    def __str__(self):
        return f"Rental: {self.car.name} to {self.renter_name}"
