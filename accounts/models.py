from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass


class UserProfile(models.Model):
    name = models.CharField(max_length=255)
    avatar = models.ImageField(upload_to='images/', blank=True, null=True)
    about = models.TextField()
    uri = models.CharField(max_length=255, blank=True)
    instruments = models.ManyToManyField('Instrument', related_name='instruments', blank=True)
    created_by = models.OneToOneField(User, related_name='profile', blank=True, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    # following = models.ManyToManyField('Connection', related_name='connections', blank=True)

    def get_connections(self):
        connections = Connection.objects.filter(creator=self.user)
        return connections

    def get_followers(self):
        followers = Connection.objects.filter(following=self.user)
        return followers

    def __str__(self):
        return self.name

class Instrument(models.Model):
    text = models.TextField()

    def __str__(self):
        return self.text

class Connection(models.Model):
    creator = models.ForeignKey(User, related_name="friendship_creator_set", on_delete=models.CASCADE)
    following = models.ForeignKey(User, related_name="friend_set", on_delete=models.CASCADE)

    def __str__(self):
        return str(self.creator) + " followed " + str(self.following)
