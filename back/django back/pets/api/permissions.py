from rest_framework import permissions
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed

class IsGetOrIsAuthenticated(permissions.IsAuthenticated):        
    def has_permission(self, request, view):
        # Allows all GET requests
        if request.method == 'GET':
            return True
    
        return super().has_permission(request, view)
    
class IsPostOrIsAuthenticated(permissions.IsAuthenticated):        
    def has_permission(self, request, view):
        # Allows all POST requests
        if request.method == 'POST':
            return True
    
        return super().has_permission(request, view)
