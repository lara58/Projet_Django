from django.urls import path
from .views import get_attraction_photos, get_attractions, get_compilations,  get_attraction_reviews, get_attraction_details_view


urlpatterns = [
    path('attractions/', get_attractions, name='get_attractions'),
    path('compilations/', get_compilations, name='get_compilations'),
    path('reviews/<int:location_id>/', get_attraction_reviews, name='get_reviews'),
    path('photos/<int:location_id>/', get_attraction_photos, name='get_attraction_photos'),
    path('attractions/<int:location_id>/', get_attraction_details_view, name='get_attraction_details'),]