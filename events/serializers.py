from rest_framework import serializers

from .models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id','title', 'image', 'location', 'description', 'category', 'created_by', 'attendees',)
        # depth = 1