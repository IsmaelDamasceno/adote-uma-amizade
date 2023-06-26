
from rest_framework import serializers
from rest_framework.validators import ValidationError
from .models import PetOwner, Pet


class PetOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetOwner
        
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
        }
        fields = ['id', 'username', 'email', 'phone_number', 'address', 'password', 'first_name', 'last_name']
    
    def create(self, validated_data):
        password = validated_data.get('password')
        user = self.Meta.model(**validated_data)
        
        if password is not None:
            user.set_password(password)
        else:
            raise ValidationError("Password is required")
        
        user.save()
        return user
    
    def update(self, user, validated_data):
        password = validated_data.get('password')

        user = super().update(user, validated_data)
        if password is not None:
            user.set_password(password)

        user.save()
        return user
    
class PetSerializer(serializers.ModelSerializer):
    owner_name = serializers.ReadOnlyField(source='owner.username')
    owner_email = serializers.ReadOnlyField(source='owner.email')

    class Meta:
        model = Pet
        fields = ['id', 'name', 'breed', 'age', 'color', 'size', 'description', 'gender', 'address', 'post_date', 'owner_name', 'owner_email', 'image']

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)
