import psycopg2
from django.db import connection, IntegrityError

def validar_entrada_dados(self, data, required_fields_with_types):
    """Método de apoio para validação de dados."""
    errors = {}

    for field, field_type in required_fields_with_types.items():
        if field not in data or data[field] in [None, '']:
            errors[field] = f"{field} é obrigatório."
        elif not isinstance(data[field], field_type):
            errors[field] = f"{field} deve ser do tipo {field_type.__name__}."

    return errors
