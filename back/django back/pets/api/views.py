from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import PetOwner, Pet
from .serializers import PetOwnerSerializer, PetSerializer
from api.permissions import IsGetOrIsAuthenticated, IsPostOrIsAuthenticated

class PetOwnerListCreate(generics.ListCreateAPIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsPostOrIsAuthenticated,)

    queryset = PetOwner.objects.all()
    serializer_class = PetOwnerSerializer

class PetOwnerRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    queryset = PetOwner.objects.all()
    serializer_class = PetOwnerSerializer

    def update(self, request, *args, **kwargs):
        self.verify_user(request)

        return super().update(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        self.verify_user(request)

        return super().destroy(request, *args, **kwargs)

    def verify_user(self, request):
        user = self.get_object()
        auth_user = request.user

        if (user.id != auth_user.id):
            raise PermissionDenied("You're not allowed to perform this action in this user")
        
    def get_serializer(self, *args, **kwargs):
        kwargs['partial'] = True
        return super().get_serializer(*args, **kwargs)

class PetListCreateView(generics.ListCreateAPIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsGetOrIsAuthenticated,)

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    queryset = Pet.objects.all()
    serializer_class = PetSerializer

class PetRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    queryset = Pet.objects.all()
    serializer_class = PetSerializer

    def destroy(self, request, *args, **kwargs):
        self.verify_is_owner(request)

        return super().destroy(request, *args, **kwargs)
    
    def update(self, request, *args, **kwargs):
        self.verify_is_owner(request)

        return super().update(request, *args, **kwargs)

    def verify_is_owner(self, request):
        pet = self.get_object()
        user = request.user

        if (pet.owner.id != user.id):
            raise PermissionDenied("You're not allowed to perform this action in this pet")

    def get_serializer(self, *args, **kwargs):
        kwargs['partial'] = True
        return super().get_serializer(*args, **kwargs)

class PetListOwner(generics.ListAPIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    queryset = Pet.objects.all()
    serializer_class = PetSerializer

    def list(self, request, *args, **kwargs):
        pets = self.queryset.filter(owner=request.user)

        print("Returned: ")
        listaPets = []
        for pet in pets:
            listaPets.append(pet.to_dict())

        print(listaPets)
        return Response(status=status.HTTP_200_OK, data=listaPets)
