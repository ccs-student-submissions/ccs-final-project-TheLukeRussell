from rest_framework import serializers
from accounts.models import UserProfile, User, Instrument, Connection
from django import forms
import json


class InstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instrument
        fields = ['text',]


class UserProfileSerializer(serializers.ModelSerializer):
    instruments = InstrumentSerializer(many=True, required=False)

    class Meta:
        model = UserProfile
        fields = '__all__'

    def create(self, validated_data):
        instruments_data = json.loads(self.context['request'].data['instruments'])
        profile = UserProfile.objects.create(**validated_data)

        for instrument in instruments_data:
            instrument = Instrument.objects.get(text=instrument)
            profile.instruments.add(instrument)
        return profile

    def update(self, instance, validated_data):
        instruments_data = json.loads(self.context['request'].data['instruments'])
        instance.instruments.clear()

        for instrument in instruments_data:
            instrument = Instrument.objects.get(text=instrument)
            instance.instruments.add(instrument)

        return instance


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    class Meta:
        model = User
        fields = '__all__'

class UserListSerializer(serializers.ModelSerializer):

    following = serializers.SerializerMethodField()
    follows_requesting_user = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = '__all__'

    def get_following(self, obj):
        creator = self.context['request'].user
        following = obj.created_by
        connected = Connection.objects.filter(creator=creator, following=following)
        return len(connected)

    def get_follows_requesting_user(self, obj):
        creator = self.context['request'].user
        following = obj.created_by
        connected = Connection.objects.filter(creator=following, following=creator)
        return len(connected)