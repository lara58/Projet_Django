from django.contrib import admin
from .models import Attraction, Compilation, Review, SimilarAttraction, AttractionPhoto, Profile

class AttractionAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'created_at')
    search_fields = ('name', 'category')
    list_filter = ('category',)

class CompilationAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_budget', 'total_distance')
    search_fields = ('user__username',)
    list_filter = ('total_budget',)

class ReviewAdmin(admin.ModelAdmin):
    list_display = ('attraction', 'user', 'rating', 'created_at')
    search_fields = ('attraction__name', 'user__username')
    list_filter = ('rating',)

class SimilarAttractionAdmin(admin.ModelAdmin):
    list_display = ('attraction', 'suggested_attraction', 'distance')
    search_fields = ('attraction__name', 'suggested_attraction__name')
    list_filter = ('distance',)

class AttractionPhotoAdmin(admin.ModelAdmin):
    list_display = ('attraction', 'is_blessed', 'published_date')
    search_fields = ('attraction__name',)
    list_filter = ('is_blessed',)

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'profile_type', 'country')
    search_fields = ('user__username', 'profile_type', 'country')
    list_filter = ('profile_type', 'country')

admin.site.register(Attraction, AttractionAdmin)
admin.site.register(Compilation, CompilationAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(SimilarAttraction, SimilarAttractionAdmin)
admin.site.register(AttractionPhoto, AttractionPhotoAdmin)
admin.site.register(Profile, ProfileAdmin)