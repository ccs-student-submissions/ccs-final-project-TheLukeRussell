from django.urls import path, include

from . import views

app_name = 'api'

urlpatterns = [
    path('events/', include('events.urls', namespace='events')),
    path('users/', views.UserListAPIView.as_view()),
    path('users/<int:pk>/', views.UserDetailAPIView.as_view(), name='user-detail'),
    path('profile/', views.ProfileList.as_view(), name='profile'),
    path('profile/<int:pk>/', views.UserProfileRetieveUpdateDestroyAPIView.as_view(), name='profile-update'),
    path('create/', views.UserProfileCreateAPIView.as_view(), name='profile-create'),
    path('band/', views.BandProfileList.as_view(), name='band'),
    path('band/<int:pk>/', views.BandProfileRetieveUpdateDestroyAPIView.as_view(), name='band-update'),
    path('band-create/', views.BandProfileCreateAPIView.as_view(), name='band-create'),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('profile/detail/<int:pk>/', views.InstrumentRetrieveAPIView.as_view(), name='profile-instruments'),
    path('connections/', views.ConnectionListCreateAPIView.as_view(), name='connections'),
]
