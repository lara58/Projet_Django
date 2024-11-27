from django.urls import path
from . import views

urlpatterns = [
    path('attractions/', views.get_attractions, name='get_attractions'),
    path('compilations/', views.get_compilations, name='get_compilations'),
    path('reviews/', views.get_reviews, name='get_reviews'),
    path('similar-attractions/', views.get_similar_attractions, name='get_similar_attractions'),
    path('attraction-photos/', views.get_attraction_photos, name='get_attraction_photos'),
    path('profiles/', views.get_profiles, name='get_profiles'),
]