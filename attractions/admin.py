from django.contrib import admin
from .models import Attraction, Compilation, Review, SimilarAttraction, AttractionPhoto

# Créez une classe de configuration pour l'attraction dans l'admin
class AttractionAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'created_at')  # Choisissez les champs à afficher dans la liste
    search_fields = ('name', 'category')  # Permet de rechercher par nom ou catégorie
    list_filter = ('category',)  # Permet de filtrer par catégorie

# Créez une classe de configuration pour la compilation dans l'admin
class CompilationAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_budget', 'total_distance')  # Choisissez les champs à afficher dans la liste
    search_fields = ('user__username',)  # Permet de rechercher par nom d'utilisateur
    list_filter = ('total_budget',)  # Permet de filtrer par budget total

# Créez une classe de configuration pour l'avis dans l'admin
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('attraction', 'user', 'rating', 'created_at')  # Choisissez les champs à afficher dans la liste
    search_fields = ('attraction__name', 'user__username')  # Permet de rechercher par nom d'attraction ou nom d'utilisateur
    list_filter = ('rating',)  # Permet de filtrer par note

# Créez une classe de configuration pour l'attraction similaire dans l'admin
class SimilarAttractionAdmin(admin.ModelAdmin):
    list_display = ('attraction', 'suggested_attraction', 'distance')  # Choisissez les champs à afficher dans la liste
    search_fields = ('attraction__name', 'suggested_attraction__name')  # Permet de rechercher par nom d'attraction
    list_filter = ('distance',)  # Permet de filtrer par distance

# Créez une classe de configuration pour la photo d'attraction dans l'admin
class AttractionPhotoAdmin(admin.ModelAdmin):
    list_display = ('attraction', 'is_blessed', 'published_date')  # Choisissez les champs à afficher dans la liste
    search_fields = ('attraction__name',)  # Permet de rechercher par nom d'attraction
    list_filter = ('is_blessed',)  # Permet de filtrer par bénédiction

# Enregistrez les modèles et les classes de configuration dans l'admin
admin.site.register(Attraction, AttractionAdmin)
admin.site.register(Compilation, CompilationAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(SimilarAttraction, SimilarAttractionAdmin)
admin.site.register(AttractionPhoto, AttractionPhotoAdmin)
