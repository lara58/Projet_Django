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
def get_tripadvisor_attractions(location_id, limit=10, language="en"):
    url = f"https://api.content.tripadvisor.com/api/v1/location/{location_id}/attractions"
    headers = {
        'X-TripAdvisor-API-Key': TRIPADVISOR_API_KEY
    }
    params = {
        "locationId": location_id,
        "limit": limit,
        "language": language
    }
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        response.raise_for_status()

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
        redis_client.setex(cache_key, 7200, json.dumps(data))  # Stocker dans le cache (2 heures)
        return data
    else:
        print(f"Erreur API {response.status_code}: {response.text}")
        return None

# Fonction pour rechercher des localisations (Location Search)
def search_location(query, language="en"):
    url = f"https://api.content.tripadvisor.com/api/v1/location/search"
    params = {
        "searchQuery": query,  # Terme de recherche (par exemple, un nom de ville)
        "language": language,  # Langue des résultats
    }
    cache_key = f"location_search_{query}_{language}"
    return fetch_from_tripadvisor(url, params, cache_key)

# Fonction pour récupérer les détails d'une localisation (Location Details)
def get_location_details(location_id):
    url = f"https://api.content.tripadvisor.com/api/v1/location/{location_id}/details"
    params = {
        "locationId": location_id,  # ID de la localisation pour obtenir les détails
    }
    cache_key = f"location_details_{location_id}"
    return fetch_from_tripadvisor(url, params, cache_key)

# Fonction pour récupérer les photos d'une localisation (Location Photos)
def get_location_photos(location_id, language="en"):
    url = f"https://api.content.tripadvisor.com/api/v1/location/{location_id}/photos"
    params = {
        "locationId": location_id,  # ID de la localisation pour récupérer les photos
        "language": language,  # Langue des résultats
    }
    cache_key = f"location_photos_{location_id}_{language}"
    return fetch_from_tripadvisor(url, params, cache_key)

# Fonction pour récupérer les reviews d'une localisation (Location Reviews)
def get_location_reviews(location_id, limit=10, language="en"):
    url = f"https://api.content.tripadvisor.com/api/v1/location/{location_id}/reviews"
    params = {
        "locationId": location_id,  # ID de la localisation pour récupérer les avis
        "limit": limit,  # Limite du nombre d'avis à récupérer
        "language": language,  # Langue des résultats
    }
    cache_key = f"location_reviews_{location_id}_{limit}_{language}"
    return fetch_from_tripadvisor(url, params, cache_key)

# Fonction pour sauvegarder des attractions dans MongoDB
def save_attractions_to_mongo(data):
    attractions_collection = mongo_db.attractions  # Utilise la collection MongoDB "attractions"
    for attraction in data.get('data', []):
        attraction_data = {
            'location_id': attraction.get('location_id'),
            'name': attraction.get('name'),
            'description': attraction.get('description'),
            'price': attraction.get('price'),
            'category': attraction.get('subcategory')[0]['name'] if attraction.get('subcategory') else None,
            'latitude': attraction.get('latitude'),
            'longitude': attraction.get('longitude'),
            'city': attraction.get('address_obj', {}).get('city', 'Unknown City'),
            'state': attraction.get('address_obj', {}).get('state', 'Unknown State'),
            'country': attraction.get('address_obj', {}).get('country', 'Unknown Country'),
            'postalcode': attraction.get('address_obj', {}).get('postalcode'),
            'rating': attraction.get('rating'),
            'num_reviews': attraction.get('num_reviews'),
            'photo_count': attraction.get('photo_count'),
            'website': attraction.get('website'),
            'phone': attraction.get('phone'),
            'email': attraction.get('email'),
        }
        # Met à jour ou insère dans MongoDB
        attractions_collection.update_one(
            {'location_id': attraction_data['location_id']},
            {'$set': attraction_data},
            upsert=True
        )
