from django.urls import include, path

from . import views

app_name = 'frontend'

urlpatterns = [
    path('', views.IndexView.as_view(), name = 'index'),
    path('signup/', views.IndexView.as_view(), name = 'index'),
    path('login/', views.IndexView.as_view(), name = 'index'),
    path('create/', views.IndexView.as_view(), name = 'index'),
    path('profile/detail/<int:pk>/', views.IndexView.as_view(), name = 'profile-details'),
    path('list/', views.IndexView.as_view(), name = 'profile-list'),

]
