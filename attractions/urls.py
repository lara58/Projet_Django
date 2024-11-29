from django.urls import path
from .views import get_attractions, get_compilations, get_reviews, get_attraction_details_view


urlpatterns = [
    path('attractions/', get_attractions, name='get_attractions'),
    path('compilations/', get_compilations, name='get_compilations'),
    path('reviews/', get_reviews, name='get_reviews'),
    path('attractions/<int:location_id>/', get_attraction_details_view, name='get_attraction_details'),
]