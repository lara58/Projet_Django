from django.contrib import admin
from .models import Attraction
# Créez une classe de configuration pour l'attraction dans l'admin
class AttractionAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'created_at')  # Choisissez les champs à afficher dans la liste
    search_fields = ('name', 'category')  # Permet de rechercher par nom ou catégorie
    list_filter = ('category',)  # Permet de filtrer par catégorie

# Enregistrez le modèle et la classe de configuration dans l'admin
admin.site.register(Attraction, AttractionAdmin)

