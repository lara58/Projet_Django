import requests
import os
from dotenv import load_dotenv
import redis
import json
from backend.settings import mongo_db

# Charger les variables d'environnement
load_dotenv()

# Configuration clé API TripAdvisor
TRIPADVISOR_API_KEY = os.getenv('TRIPADVISOR_API_KEY')

# Configuration Redis pour le cache
redis_client = redis.StrictRedis(host='localhost', port=6379, db=0)

# Fonction générique pour gérer les appels API TripAdvisor avec cache
def fetch_from_tripadvisor(url, params, cache_key):
    # Vérifier dans le cache
    cached_data = redis_client.get(cache_key)
    if cached_data:
        print(f"Récupération depuis le cache pour {cache_key}")
        return json.loads(cached_data)

    # Si non trouvé dans le cache, appel API
    headers = {
        "accept": "application/json",
        "X-TripAdvisor-API-Key": TRIPADVISOR_API_KEY,
    }
    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json()
        # Stocker dans le cache
        redis_client.setex(cache_key, 3600, json.dumps(data))  # Cache pour 1 heure
        return data
    else:
        response.raise_for_status()

# Fonction pour rechercher des attractions par pays
def search_location(query, limit=10, language="en"):
    url = "https://api.content.tripadvisor.com/api/v1/location/search"
    params = {
        "searchQuery": query,
        "limit": limit,
        "language": language,
        "key": TRIPADVISOR_API_KEY,
    }
    cache_key = f"search_location_{query}_{limit}_{language}"
    return fetch_from_tripadvisor(url, params, cache_key)

# Fonction pour récupérer les détails d'une attraction
def get_attraction_details(location_id, language="en"):
    url = f"https://api.content.tripadvisor.com/api/v1/location/{location_id}/details"
    params = {
        "locationId": location_id,
        "language": language,
        "key": TRIPADVISOR_API_KEY,
    }
    cache_key = f"attraction_details_{location_id}_{language}"
    return fetch_from_tripadvisor(url, params, cache_key)

# Fonction pour récupérer les photos d'une localisation (Location Photos)
def get_location_photos(location_id, language="en"):
    url = f"https://api.content.tripadvisor.com/api/v1/location/{location_id}/photos"
    params = {
        "locationId": location_id,  # ID de la localisation pour récupérer les photos
        "language": language,  # Langue des résultats
        "key": TRIPADVISOR_API_KEY,
        "limit": 5,  # Limite du nombre de photos
    }
    cache_key = f"location_photos_{location_id}_{language}"
    return fetch_from_tripadvisor(url, params, cache_key)

# Fonction pour récupérer les reviews d'une localisation (Location Reviews)
def get_location_reviews(location_id, language="en"):
    url = f"https://api.content.tripadvisor.com/api/v1/location/{location_id}/reviews"
    params = {
        "locationId": location_id,
        "limit": 10,
        "language": language,
        "key": TRIPADVISOR_API_KEY,
    }
    cache_key = f"location_reviews_{location_id}_{language}"
    return fetch_from_tripadvisor(url, params, cache_key)

# Fonction pour sauvegarder des attractions dans MongoDB
def save_attractions_to_mongo(data):
    attractions_collection = mongo_db.attractions
    attractions_collection.insert_many(data)


