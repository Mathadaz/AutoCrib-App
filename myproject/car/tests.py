from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from .models import Car, Rental
from datetime import date

class CarRentalAPITest(APITestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        
        # Get JWT token
        response = self.client.post(reverse('token_obtain_pair'), {
            'username': 'testuser',
            'password': 'testpass123'
        })
        self.token = response.data['access']
        self.auth_header = f'Bearer {self.token}'

    def test_register_user(self):
        response = self.client.post(reverse('register'), {
            'username': 'newuser',
            'password': 'newpass123'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_car(self):
        response = self.client.post(reverse('car-list'), {
            'name': 'Camry',
            'make': 'Toyota',
            'brand': 'Corolla',
            'model_year': 2022,
            'is_available': True,
            'price_per_day': '800.00',
            'description': 'A great car'
        }, HTTP_AUTHORIZATION=self.auth_header)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Car.objects.count(), 1)

    def test_create_rental_and_invoice(self):
        car = Car.objects.create(
            name='Camry', make='Toyota', brand='Corolla',
            model_year=2022, is_available=True,
            price_per_day=800.00, description='Nice car'
        )

        response = self.client.post(reverse('rental-list'), {
            'car': car.id,
            'renter_name': 'Zwivhuya',
            'renter_email': 'zwivhuya@example.com',
            'start_date': '2025-07-18',
            'end_date': '2025-07-20'
        }, HTTP_AUTHORIZATION=self.auth_header)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        rental_id = response.data['id']

        # Test PDF download
        response = self.client.get(
            reverse('download-invoice', args=[rental_id]),
            HTTP_AUTHORIZATION=self.auth_header
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get('Content-Type'), 'application/pdf')
