from django.shortcuts import render
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
    try:
        compilations = Compilation.objects.all()
        if compilations:
            serializer = CompilationSerializer(compilations, many=True)
            return Response(serializer.data, status=200)
        else:
            return Response({'error': 'No compilations found'}, status=404)
    except Exception as e:
        print(f"Erreur dans get_compilations: {e}")  # Journaux dans la console
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
def get_reviews(request):
    try:
        reviews = Review.objects.all()
        if reviews:
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data, status=200)
        else:
            return Response({'error': 'No reviews found'}, status=404)
    except Exception as e:
        print(f"Erreur dans get_reviews: {e}")  # Journaux dans la console
        return Response({'error': str(e)}, status=500)

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
        if attraction_details:
            return Response(attraction_details, status=200)
        else:
            return Response({'error': 'No details found for this attraction'}, status=404)
    except Exception as e:
        print(f"Erreur dans get_attraction_details_view: {e}")  # Journaux dans la console
        return Response({'error': str(e)}, status=500)