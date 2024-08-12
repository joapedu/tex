ARG PYTHON_VERSION=3.10-slim
ARG TIMEZONE="America/Fortaleza"

LABEL João Eduardo Braga <joaoeduardobraga2@gmail.com>

FROM python:${PYTHON_VERSION}

##
## Define argumentos e variáveis de ambiente
##
ENV MY_USER="desafio-tex" \
    MY_GROUP="desafio-tex" \
    MY_UID="1000" \
    MY_GID="1000" \
    PYTHONUNBUFFERED=1 \
    TZ=${TIMEZONE}

##
## Configura o timezone do servidor
##
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

##
## Define o diretório de trabalho
##
WORKDIR /code

##
## Copia e instala as dependências Python
##
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

##
## Expor a porta
##
EXPOSE 8000

##
## Roda o server
##
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
