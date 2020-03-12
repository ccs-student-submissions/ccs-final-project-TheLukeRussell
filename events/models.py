from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

CATEGORY = [
    ('Hangout', 'Hangout'),
    ('Band Event', 'Band Event'),
    ('Jam Sesh', 'Jam Sesh'),
]

class Event(models.Model):
    title = models.CharField(default="Untitled Event", max_length=255)
    category = models.CharField(default="Hangout", max_length=255, choices=CATEGORY)
    image = models.ImageField(upload_to='images/', null=True)
    description = models.TextField()
    location = models.CharField(default='Untitled Location', max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name='events')
    attendees = models.ManyToManyField(User, related_name='event')

    def __str__(self):
        return str(self.title) + " created at " + str(self.created_at)