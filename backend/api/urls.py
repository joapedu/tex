from django.urls import path
from .views import PessoasApiView

urlpatterns = [
    path('pessoas/criar/', PessoasApiView.as_view(), name='criar_pessoa'),
    path('pessoas/atualizar/', PessoasApiView.as_view(), name='atualizar_pessoa'),
    path('pessoas/remover/', PessoasApiView.as_view(), name='remover_pessoa'),
    path('pessoas/', PessoasApiView.as_view(), name='selecionar_pessoas'),
]
