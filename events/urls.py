from django.urls import path, include

from . import views

app_name = 'api_v1'

urlpatterns = [
    path('', views.EventList.as_view(), name = 'event_list'),
    path('<int:pk>/', views.EventDetail.as_view(), name = 'event_detail'),
    path('rest-auth/', include('rest_auth.urls')),
]