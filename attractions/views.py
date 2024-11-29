from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Attraction, Compilation, Review, SimilarAttraction, AttractionPhoto, Profile
from .serializers import AttractionSerializer, CompilationSerializer, ReviewSerializer, SimilarAttractionSerializer, AttractionPhotoSerializer, ProfileSerializer

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
