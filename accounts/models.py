from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass


class UserProfile(models.Model):
    name = models.CharField(max_length=255)
    avatar = models.ImageField(upload_to='images/', blank=True, null=True)
    about = models.TextField()
    instruments = models.ManyToManyField('Instrument', related_name='instruments', blank=True)
    created_by = models.OneToOneField(User, related_name='profile', blank=True, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Instrument(models.Model):
    text = models.TextField()

    def __str__(self):
        return self.text
