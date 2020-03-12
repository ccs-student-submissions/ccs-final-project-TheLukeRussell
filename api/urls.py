from django.urls import path, include

from . import views

app_name = 'api'

urlpatterns = [
    # path('events/', include('events.urls', namespace='events')),
    path('users/', views.UserListAPIView.as_view()),
    path('users/<int:pk>/', views.UserDetailAPIView.as_view(), name='user-detail'),
    path('profile/detail/', views.UserProfileListAPIView.as_view(), name='profile-detail'),
    path('profile/create/', views.UserProfileCreateAPIView.as_view(), name='profile-create'),
    path('profile/<int:pk>/', views.UserProfileRetieveUpdateDestroyAPIView.as_view(), name='profile-update'),
    path('create/', views.UserProfileCreateAPIView.as_view(), name='profile-create'),
    # path('profile/detail/<int:pk>/', views.InstrumentRetrieveAPIView.as_view(), name='profile-instruments'),
]
