import requests
import os
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

# Récupérer la clé API
TRIPADVISOR_API_KEY = os.getenv("TRIPADVISOR_API_KEY")

class TripAdvisorService:
    BASE_URL = "https://api.content.tripadvisor.com/api/v1/location/search"

    @staticmethod
    def fetch_data(params=None):
        """
        Envoie une requête GET à l'API Tripadvisor.
        """
        if params is None:
            params = {}

        # Ajout de la clé API dans les en-têtes
        headers = {
            "accept": "application/json",
            "X-TripAdvisor-API-Key": TRIPADVISOR_API_KEY,
        }

        # Ajout de la clé API dans les paramètres si nécessaire
        params["key"] = TRIPADVISOR_API_KEY

        try:
            # Journaliser les informations de la requête
            print(f"Requête envoyée à {TripAdvisorService.BASE_URL} avec paramètres {params}")
            
            response = requests.get(TripAdvisorService.BASE_URL, headers=headers, params=params)
            
            # Journaliser la réponse
            print(f"Code HTTP : {response.status_code}")
            print(f"Réponse brute : {response.text}")
            
            response.raise_for_status()  # Lève une exception si la réponse HTTP indique une erreur
            return response.json()  # Retourne les données JSON si succès
        except requests.RequestException as e:
            print(f"Erreur lors de l'appel à l'API Tripadvisor : {e}")
            return None
