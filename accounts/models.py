from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    def get_following(self):
        return Connection.objects.filter(user=self)

    def get_followers(self):
        return Connection.objects.filter(following=self)

    def get_band_following(self):
        return Member.objects.filter(user=self)

    def get_band_members(self):
        return Member.objects.filter(band_member=self)


class UserProfile(models.Model):
    name = models.CharField(max_length=255)
    avatar = models.ImageField(upload_to='images/', blank=True, null=True)
    about = models.TextField()
    uri = models.CharField(max_length=255, blank=True)
    instruments = models.ManyToManyField('Instrument', related_name='instruments', blank=True)
    created_by = models.OneToOneField(User, related_name='profile', blank=True, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    # following = models.ManyToManyField('Connection', related_name='connections', blank=True)

    def __str__(self):
        return self.name

class BandProfile(models.Model):
    name = models.CharField(max_length=255)
    avatar = models.ImageField(upload_to='images/', blank=True, null=True)
    about = models.TextField()
    uri = models.CharField(max_length=255, blank=True)
    # members = models.ManyToManyField(User, related_name="members", blank=True)
    created_by = models.OneToOneField(User, related_name='band', blank=True, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Instrument(models.Model):
    text = models.TextField()

    def __str__(self):
        return self.text

class Connection(models.Model):
    user = models.ForeignKey(User, related_name="friendship_creator_set", on_delete=models.CASCADE)
    following = models.ForeignKey(User, related_name="following_set", on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user.username) + " followed " + str(self.following.username)

class Member(models.Model):
    user = models.ForeignKey(User, related_name="member_creator_set", on_delete=models.CASCADE)
    band_member = models.ForeignKey(User, related_name="members", on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user.username) + " added " + str(self.band_member.username)
