from django.shortcuts import render

from .models import Attraction
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import AttractionSerializer

@api_view(['GET'])
def get_attractions(request):
    attractions = Attraction.objects.all()
    serializer = AttractionSerializer(attractions, many=True)
    return Response(serializer.data)

