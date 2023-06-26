from django.db import models
from django.utils import timezone

from django.contrib.auth.models import AbstractUser

class PetOwner(AbstractUser):
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20)

class Pet(models.Model):
    name = models.CharField(max_length=100)
    breed = models.CharField(max_length=100)
    age = models.IntegerField()
    color = models.CharField(max_length = 10)
    size = models.CharField(max_length = 10)
    description = models.CharField(max_length = 250)
    gender = models.CharField(max_length = 9)
    address = models.CharField(max_length = 40)
    post_date = models.DateField(default=timezone.now().date())
    image = models.ImageField(upload_to="images/pets/")
    owner = models.ForeignKey(PetOwner, on_delete=models.CASCADE, related_name='pets')

    def __str__(self):
        self.name

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'name': self.name,
            'breed': self.breed,
            'age': self.age,
            'color': self.color,
            'size': self.size,
            'description': self.description,
            'gender': self.gender,
            'address': self.address,
            'post_date': self.post_date,
            'owner_name': self.owner.username,
            'image': f"http://127.0.0.1:8000/media/{self.image.name}"
        }
