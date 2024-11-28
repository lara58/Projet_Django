from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Attraction, Compilation, Review, SimilarAttraction, AttractionPhoto, Profile
from .serializers import AttractionSerializer, CompilationSerializer, ReviewSerializer, SimilarAttractionSerializer, AttractionPhotoSerializer, ProfileSerializer

@api_view(['GET'])
def get_attractions(request):
    attractions = Attraction.objects.all()
    serializer = AttractionSerializer(attractions, many=True)
    return Response(serializer.data)

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