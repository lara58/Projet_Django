#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from dotenv import load_dotenv


load_dotenv()  # Charge les variables depuis .env

# Vérification des variables essentielles
if not os.getenv('TRIPADVISOR_API_KEY'):
    raise EnvironmentError("La clé API TripAdvisor manque dans le fichier .env.")
if not os.getenv('MONGO_URI'):
    raise EnvironmentError("L'URI MongoDB manque dans le fichier .env.")
if not os.getenv('REDIS_HOST') or not os.getenv('REDIS_PORT'):
    raise EnvironmentError("La configuration Redis est incomplète.")

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()

