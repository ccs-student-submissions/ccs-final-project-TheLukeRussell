from django.urls import include, path

from . import views

app_name = 'frontend'

urlpatterns = [
    path('', views.IndexView.as_view(), name = 'index'),
    path('signup/', views.IndexView.as_view(), name = 'signup'),
    path('signup/', views.IndexView.as_view(), name = 'signup-choice'),
    path('login/', views.IndexView.as_view(), name = 'login'),
    path('create/', views.IndexView.as_view(), name = 'create'),
    path('profile/detail/<int:pk>/', views.IndexView.as_view(), name = 'profile-details'),
    path('band/detail/<int:pk>/', views.IndexView.as_view(), name = 'band-details'),
    path('band-create/', views.IndexView.as_view(), name = 'band-create'),
    path('list/', views.IndexView.as_view(), name = 'profile-list'),
    path('band/', views.IndexView.as_view(), name = 'band-list'),
    path('add-event/', views.IndexView.as_view(), name = 'add-event'),
    path('events/', views.IndexView.as_view(), name = 'events'),
    path('events/<int:pk>/', views.IndexView.as_view(), name = 'event-details'),
    path('favicon.ico', views.IndexView.as_view(), name = 'favicon'),
    path('manifest.json', views.IndexView.as_view(), name = 'manifest'),
]
