
from django.urls import path
from .views import PetOwnerListCreate, PetOwnerRetrieveUpdateDestroyView, PetListCreateView, PetRetrieveUpdateDestroyView, PetListOwner
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import token_verify

urlpatterns = [
    path('pet-owners/', PetOwnerListCreate.as_view(), name='petowner-list-create'),
    path('pet-owners/<int:pk>/', PetOwnerRetrieveUpdateDestroyView.as_view(), name='petowner-retrieve-update-destroy'),
    path('pets/', PetListCreateView.as_view(), name='pet-list-create'),
    path('my-pets/', PetListOwner.as_view(), name='my-pets'),
    path('pets/<int:pk>/', PetRetrieveUpdateDestroyView.as_view(), name='pet-retrieve-update-destroy'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('verify/', token_verify, name='verify')
]
