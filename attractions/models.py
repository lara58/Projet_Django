from django.db import models
from django.contrib.auth.models import User

# Profile Model (si vous utilisez un modèle de profil utilisateur)
class Profile(models.Model):
    PROFILE_CHOICES = [
        ('local', 'Local'),
        ('tourist', 'Touriste'),
        ('professional', 'Professionnel'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_type = models.CharField(max_length=20, choices=PROFILE_CHOICES)
    country = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.username} - {self.profile_type}"

# Attraction Model
class Attraction(models.Model):
    location_id = models.IntegerField(unique=True, default=0)  # Identifiant unique avec valeur par défaut
    name = models.CharField(max_length=255)  # Nom de l'attraction
    description = models.TextField()  # Description de l'attraction
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Prix
    category = models.CharField(max_length=100)  # Catégorie (par exemple: attraction, restaurant, hôtel)
    location = models.CharField(max_length=255, default='Unknown Location')  # Localisation avec valeur par défaut
    address = models.TextField(null=True, blank=True)  # Adresse complète
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)  # Latitude
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)  # Longitude
    city = models.CharField(max_length=100, default='Unknown City')  # Ville avec valeur par défaut
    state = models.CharField(max_length=100, default='Unknown State')  # État avec valeur par défaut
    country = models.CharField(max_length=100, default='Unknown Country')  # Pays avec valeur par défaut
    postalcode = models.CharField(max_length=20, null=True, blank=True)  # Code postal
    image = models.ImageField(upload_to='attractions/', null=True, blank=True)  # Image de l'attraction
    rating = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)  # Note (Tripadvisor)
    num_reviews = models.IntegerField(null=True, blank=True)  # Nombre d'avis
    photo_count = models.IntegerField(null=True, blank=True)  # Nombre de photos
    ranking = models.IntegerField(null=True, blank=True)  # Classement
    website = models.URLField(null=True, blank=True)  # Site web
    phone = models.CharField(max_length=50, null=True, blank=True)  # Téléphone
    email = models.EmailField(null=True, blank=True)  # Email
    created_at = models.DateTimeField(auto_now_add=True)  # Date de création de l'attraction
    updated_at = models.DateTimeField(auto_now=True)  # Date de mise à jour

    def __str__(self):
        return self.name

# AttractionPhoto Model
class AttractionPhoto(models.Model):
    attraction = models.ForeignKey(Attraction, related_name='photos', on_delete=models.CASCADE)
    is_blessed = models.BooleanField(default=False)
    album = models.CharField(max_length=255, null=True, blank=True)
    caption = models.CharField(max_length=255, null=True, blank=True)
    published_date = models.DateTimeField(null=True, blank=True)
    images = models.JSONField(null=True, blank=True)
    source = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"Photo for {self.attraction.name}"

# Compilation Model for user's selected attractions
class Compilation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    attractions = models.ManyToManyField(Attraction)
    total_budget = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    total_distance = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Optional

    def __str__(self):
        return f"{self.user.username}'s Compilation"

# Review Model (for TripAdvisor-style reviews)
class Review(models.Model):
    attraction = models.ForeignKey(Attraction, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()  # Rating between 1 to 5
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for {self.attraction.name} by {self.user.username}"

# SimilarAttraction Model for displaying suggestions
class SimilarAttraction(models.Model):
    attraction = models.ForeignKey(Attraction, on_delete=models.CASCADE, related_name='similar_attractions')
    suggested_attraction = models.ForeignKey(Attraction, on_delete=models.CASCADE)
    location_id = models.IntegerField(unique=True)  # Identifiant unique de la localisation sur TripAdvisor
    name = models.CharField(max_length=255)  # Nom de l'attraction similaire
    distance = models.CharField(max_length=100, null=True, blank=True)  # Distance en miles
    bearing = models.CharField(max_length=100, null=True, blank=True)  # Direction par rapport à la localisation
    address_obj = models.JSONField(null=True, blank=True)  # Adresse sous forme d'objet JSON

    def __str__(self):
        return f"Suggested {self.suggested_attraction.name} for {self.attraction.name}"