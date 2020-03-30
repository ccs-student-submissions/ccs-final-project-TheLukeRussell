from rest_framework import generics, permissions, viewsets
from django.shortcuts import get_object_or_404
from accounts.models import UserProfile, User, Connection, BandProfile
from .serializers import UserProfileSerializer, UserSerializer, ConnectionSerializer, BandProfileSerializer


class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProfileList(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class UserProfileCreateAPIView(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class UserProfileRetieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

class BandProfileList(generics.ListCreateAPIView):
    queryset = BandProfile.objects.all()
    serializer_class = BandProfileSerializer

class BandProfileCreateAPIView(generics.ListCreateAPIView):
    queryset = BandProfile.objects.all()
    serializer_class = BandProfileSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class BandProfileRetieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BandProfile.objects.all()
    serializer_class = BandProfileSerializer

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

class InstrumentRetrieveAPIView(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_object_or_404(self):
        user = self.request.user
        return UserProfile.objects.filter(instruments=instruments)

class ConnectionListCreateAPIView(generics.ListCreateAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer

    def perform_create(self, serializer):
        following = get_object_or_404(User, pk=self.request.data['following'])
        serializer.save(user=self.request.user, following=following);