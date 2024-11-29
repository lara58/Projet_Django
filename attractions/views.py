from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Attraction, Compilation, Review, SimilarAttraction, AttractionPhoto, Profile
from .serializers import AttractionSerializer, CompilationSerializer, ReviewSerializer, SimilarAttractionSerializer, AttractionPhotoSerializer, ProfileSerializer
from django.shortcuts import render
from .services import get_location_photos, get_location_reviews, save_attractions_to_mongo, search_location, get_attraction_details
from .services2 import TripAdvisorService
from django.http import JsonResponse
from dotenv import load_dotenv
import redis
import json
import os


# Charger les variables d'environnement
load_dotenv()

# Configuration clé API TripAdvisor
TRIPADVISOR_API_KEY = os.getenv('TRIPADVISOR_API_KEY')


@api_view(['GET'])
def get_attractions(request):
    profile = request.GET.get('profile')  # Récupère le paramètre 'profile'
    country = request.GET.get('country')  # Récupère le paramètre 'country'

    # Filtrer les attractions en fonction du pays et du profil
    attractions = Attraction.objects.all()

    if country:
        attractions = attractions.filter(country=country)
    
    # Filtrage basé sur le profil
    if profile:
        # Exemple de filtrage par 'category' basé sur le profil (à adapter selon vos données)
        if profile == 'local':
            attractions = attractions.filter(category__icontains='local')  # Adaptez le filtre selon vos champs
        elif profile == 'tourist':
            attractions = attractions.filter(category__icontains='tourist')  # Adaptez le filtre selon vos besoins
        elif profile == 'professional':
            attractions = attractions.filter(category__icontains='professional')  # Idem

    # Sérialiser les résultats
    serializer = AttractionSerializer(attractions, many=True)
    return Response(serializer.data)
    country = request.query_params.get('country', None)
    if country:
        try:
            attractions = search_location(country)
            if attractions:
                return Response(attractions)
            else:
                return Response({'error': 'No data found'}, status=404)
        except Exception as e:
            print(f"Erreur dans get_attractions: {e}")  # Journaux dans la console
            return Response({'error': str(e)}, status=500)
    else:
        return Response({'error': 'Country parameter is required'}, status=400)


@api_view(['GET'])
def get_compilations(request):
    compilations = Compilation.objects.all()
    serializer = CompilationSerializer(compilations, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_reviews(request):
    reviews = Review.objects.all()
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_similar_attractions(request):
    similar_attractions = SimilarAttraction.objects.all()
    serializer = SimilarAttractionSerializer(similar_attractions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_attraction_photos(request):
    photos = AttractionPhoto.objects.all()
    serializer = AttractionPhotoSerializer(photos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_profiles(request):
    profiles = Profile.objects.all()
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def get_attraction_details_view(request, location_id):
    try:
        attraction_details = get_attraction_details(location_id)
        return Response(attraction_details)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

