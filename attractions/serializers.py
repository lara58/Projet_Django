from rest_framework import serializers
from .models import Attraction, Compilation, Review, SimilarAttraction, AttractionPhoto

class AttractionPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttractionPhoto
        fields = '__all__'

class AttractionSerializer(serializers.ModelSerializer):
    photos = AttractionPhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Attraction
        fields = '__all__'

class CompilationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compilation
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class SimilarAttractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SimilarAttraction
        fields = '__all__'