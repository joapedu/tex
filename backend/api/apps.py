"""Arquivo de apps do sistema."""
from django.apps import AppConfig


class ApiConfig(AppConfig):
    """Classe de config da api."""
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
