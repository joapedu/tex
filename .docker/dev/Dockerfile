FROM python:3.10-slim

LABEL João Eduardo Braga <joaoeduardobraga2@gmail.com>

##
## Define argumentos e variáveis de ambiente
##
ENV MY_USER="tex" \
    MY_GROUP="tex" \
    MY_UID="1000" \
    MY_GID="1000" \
    PYTHONUNBUFFERED=1 \
    TZ="America/Fortaleza"

##
## Configura o timezone do servidor
##
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

##
## Define o diretório de trabalho
##
WORKDIR /app

##
## Copia e instala as dependências Python
##
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

##
## Copia o código-fonte do backend
##
COPY backend/ /app/

##
## Expor a porta
##
EXPOSE 8000

##
## Roda o server
##
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
