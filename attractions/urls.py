from django.urls import path
from . import views

urlpatterns = [
    path('attractions/', views.get_attractions, name='get_attractions'),
]