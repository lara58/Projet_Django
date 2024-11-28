import requests
import os
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

# Récupérer la clé API depuis .env
TRIPADVISOR_API_KEY = os.getenv("TRIPADVISOR_API_KEY")

# Fonction pour effectuer une recherche de localisation
def search_location(query):
    url = "https://api.content.tripadvisor.com/api/v1/location/search"
    headers = {
        "accept": "application/json",
        "X-TripAdvisor-API-Key": TRIPADVISOR_API_KEY,  # Clé API dans l'en-tête
    }
    params = {
        "searchQuery": query,  # Terme de recherche (par exemple, un nom de ville)
        "language": "en",  # Langue des résultats
        "key": TRIPADVISOR_API_KEY,  # Clé API (parfois ajoutée en paramètre si nécessaire)
    }
    
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Erreur {response.status_code}: {response.text}")
        return None

# Test de l'API
if __name__ == "__main__":
    query = "London"  # Exemple : Rechercher "London"
    data = search_location(query)
    
    if data:
        print("Résultats de recherche :")
        print(data)
    else:
        print("La recherche a échoué.")
