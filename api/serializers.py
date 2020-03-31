from rest_framework import serializers
from accounts.models import UserProfile, Instrument, Connection, BandProfile, Member
from rest_auth.models import TokenModel
from django import forms
import json

from django.contrib.auth import get_user_model

User = get_user_model()

class TokenUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('band', 'profile',)
        depth = 1

class TokenSerializer(serializers.ModelSerializer):
    user = TokenUserSerializer(many=False, read_only=True)
    class Meta:
        model = TokenModel
        fields = ('key', 'user',)

class InstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instrument
        fields = ['text',]


class UserProfileSerializer(serializers.ModelSerializer):
    instruments = InstrumentSerializer(many=True, required=False)

    class Meta:
        model = UserProfile
        fields = '__all__'
        depth = 1


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

class BandProfileSerializer(serializers.ModelSerializer):
    # instruments = InstrumentSerializer(many=True, required=False)

    class Meta:
        model = BandProfile
        fields = '__all__'
        depth = 1
        
class ConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connection
        fields = ('user', 'following')
        depth = 1

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('user', 'band_member')
        depth = 1


class UserSerializer(serializers.ModelSerializer):
    following = ConnectionSerializer(many=True, source='get_following')
    followers = ConnectionSerializer(many=True, source='get_followers')
    band_following = MemberSerializer(many=True, source='get_band_following')
    band_members = MemberSerializer(many=True, source='get_band_members')
    profile = UserProfileSerializer()
    band = BandProfileSerializer()
    
    class Meta:
        model = User
        fields = '__all__'
        depth = 1