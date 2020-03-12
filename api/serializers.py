from rest_framework import serializers
from accounts.models import UserProfile, User, Instrument
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