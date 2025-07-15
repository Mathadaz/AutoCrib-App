from django.urls import path
from . import views

urlpatterns = [
    path('cars/', views.CarListCreateView.as_view(), name='car-list'),
    path('cars/<int:pk>/', views.CarDetailView.as_view(), name='car-detail'),
    path('rentals/', views.RentalListCreateView.as_view(), name='rental-list'),
    path('rentals/<int:pk>/', views.RentalDetailView.as_view(), name='rental-detail'),
]
