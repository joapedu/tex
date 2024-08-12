import json

from django.http import JsonResponse
from django.views import View
from django.db import IntegrityError, connection

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import psycopg2

@method_decorator(csrf_exempt, name='dispatch')
class PessoasApiView(View):
    """Api de listagem, criação, atualização e remoção de dados de pessoas."""
    def get(self, request):
        """Seleciona registros das pessoas."""
        try:
            id_pessoa = request.GET.get('idPessoa', None)

            with connection.cursor() as cursor:
                if id_pessoa:
                    cursor.callproc('obter_pessoa', [id_pessoa])
                    resultado = cursor.fetchone()
                else:
                    cursor.callproc('selecionar_todas_pessoas')
                    resultado = cursor.fetchall()

            return JsonResponse({'data': resultado}, status=200)

        except Exception as e:
            return JsonResponse({'Erro': 'Erro ao selecionar pessoa(s)'}, status=400)

    def post(self, request):
        """Registra uma nova pessoa."""
        try:
            dados = json.loads(request.body)
            required_fields_with_types = {
                'nome': str,
                'dataNascimento': str,
                'salario': (int, float),
                'nomeMae': str,
                'nomePai': str,
                'cpf': str
            }

            validation_errors = self.validar_entrada_dados(dados, required_fields_with_types)

            if validation_errors:
                return JsonResponse({'Erro': 'Dados inválidos', 'Detalhamento': validation_errors}, status=400)

            nome = dados['nome']
            data_nascimento = dados['dataNascimento']
            salario = dados['salario']
            observacoes = dados.get('observacoes', '')
            nome_mae = dados['nomeMae']
            nome_pai = dados['nomePai']
            cpf = dados['cpf']

            with connection.cursor() as cursor:
                try:
                    cursor.callproc('inserir_pessoa', [nome, data_nascimento, salario, observacoes, nome_mae, nome_pai, cpf])
                    id_pessoa = cursor.fetchone()[0]
                except IntegrityError as e:
                    if isinstance(e.__cause__, psycopg2.errors.UniqueViolation):
                        return JsonResponse({'Erro': 'Esse CPF já existe na base dados'}, status=400)
                    return JsonResponse({'Erro': 'Erro no processamento'}, status=400)

            return JsonResponse({'idPessoa': id_pessoa}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'Erro': 'Formato de JSON inválido'}, status=400)
        except Exception as e:
            return JsonResponse({'Erro': 'Erro ao criar pessoa'}, status=400)

    def put(self, request):
        """Atualiza um registro de pessoa."""
        try:
            dados = json.loads(request.body)
            required_fields_with_types = {
                'idPessoa': int,
                'nome': str,
                'dataNascimento': str,
                'salario': (int, float),
                'nomeMae': str,
                'nomePai': str,
                'cpf': str
            }

            validation_errors = self.validar_entrada_dados(dados, required_fields_with_types)

            if validation_errors:
                return JsonResponse({'Erro': 'Dados inválidos', 'Detalhamento': validation_errors}, status=400)

            id_pessoa = dados['idPessoa']
            nome = dados['nome']
            data_nascimento = dados['dataNascimento']
            salario = dados['salario']
            observacoes = dados.get('observacoes', '')
            nome_mae = dados['nomeMae']
            nome_pai = dados['nomePai']
            cpf = dados['cpf']

            with connection.cursor() as cursor:
                try:
                    cursor.callproc('atualizar_pessoa', [id_pessoa, nome, data_nascimento, salario, observacoes, nome_mae, nome_pai, cpf])
                    retorno = cursor.fetchone()[0]
                except IntegrityError as e:
                    return JsonResponse({'Erro': 'Erro no processamento'}, status=400)

            return JsonResponse({'status': retorno}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'Erro': 'Formato de JSON inválido'}, status=400)
        except Exception as e:
            return JsonResponse({'Erro': 'Erro ao atualizar pessoa'}, status=400)

    def delete(self, request):
        """Remove um registro de pessoa."""
        try:
            dados = json.loads(request.body)
            if 'idPessoa' not in dados or dados['idPessoa'] in [None, '']:
                return JsonResponse({'Erro': 'Dados inválidos', 'Detalhamento': {'idPessoa': 'idPessoa é obrigatório.'}}, status=400)

            id_pessoa = dados['idPessoa']
            
            with connection.cursor() as cursor:
                cursor.execute("SELECT COUNT(1) FROM Pessoas WHERE IdPessoa = %s", [id_pessoa])
                exists = cursor.fetchone()[0]

                if not exists:
                    return JsonResponse({'Erro': 'Pessoa não encontrada', 'Detalhamento': {'idPessoa': f'Nenhuma pessoa encontrada com ID {id_pessoa}'}}, status=404)

                try:
                    cursor.callproc('remover_pessoa', [id_pessoa])
                    retorno = cursor.fetchone()[0]
                except Exception as e:
                    return JsonResponse({'Erro': 'Erro ao remover pessoa'}, status=400)

            return JsonResponse({'status': retorno}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'Erro': 'Formato de JSON inválido'}, status=400)
        except Exception as e:
            return JsonResponse({'Erro': 'Erro ao remover pessoa'}, status=400)
