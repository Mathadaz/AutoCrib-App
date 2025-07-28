from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    CarListCreateView, CarDetailView,
    RentalListCreateView, RentalDetailView,
    download_invoice, RegisterView, CarViewSet
)
# Register viewsets using router
router = DefaultRouter()
router.register(r'cars', CarViewSet)

urlpatterns = [
    path('cars-list/', CarListCreateView.as_view(), name='car-list'),
    path('cars-list/<int:pk>/', CarDetailView.as_view(), name='car-detail'),
    path('rentals/', RentalListCreateView.as_view(), name='rental-list'),
    path('rentals/<int:pk>/', RentalDetailView.as_view(), name='rental-detail'),
    path('invoice/<int:rental_id>/', download_invoice, name='download-invoice'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Include the router URLs
    path('', include(router.urls)),
]
