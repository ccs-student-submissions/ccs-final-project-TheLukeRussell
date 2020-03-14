from rest_framework import generics, permissions, viewsets
from django.shortcuts import get_object_or_404
from accounts.models import UserProfile, User
from .serializers import UserProfileSerializer, UserSerializer, UserListSerializer


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

class InstrumentRetrieveAPIView(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_object_or_404(self):
        user = self.request.user
        return UserProfile.objects.filter(instruments=instruments)

class UserProfileListAPIView(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        user = self.request.user
        return UserProfile.objects.filter(created_by=user.id)

# class AddConnection(generics.RetrieveUpdateDestroyAPIView):
#     queryset = UserProfile.objects.all()
#     serializer_class = UserProfileSerializer
    
#     def get_object(self):
#         return UserProfile.objects.get(created_by=self.request.user)

#     def patch(self, request, *args, **kwargs):
#         # UserProfile.connection.add 
#         connection = get_object_or_404(UserProfile, pk=pk)
#         connection.users.add(request.user)
#         connection.save()
#         return self.partial_update(request, *args, **kwargs)

class UserListsAPIView(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserListSerializer

class UserListsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserListSerializer

    def get_queryset(self):
        user = self.request.user
        return UserProfile.objects.filter(created_by=user.id)

    # def get_object(self):
    #     return UserProfile.objects.get(created_by=self.request.user)