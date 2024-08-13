![](./public/data-tex-pequeno.png)

# Tex 

## Projeto para gestão de pessoas com Django, PostgreSQL, React.ts e Docker 🐳

<p float="left">
 <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white">
 <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
 <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white">
 <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white">
 <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white">
</p>

## Ideia: 💡
Desenvolver uma API para gestão de pessoas, utilizando Django como framework backend, PostgreSQL como banco de dados relacional e Docker para gerenciar o ambiente de desenvolvimento e produção. O projeto também inclui um pipeline de CI/CD configurado no GitHub Actions para garantir a qualidade do código e facilitar o deploy. Além disso, foi feito um frontend com intuito de ter uma visualização estética e agradável dos dados. 

## Instruções Docker: 🐳
Para executar o projeto em **modo de desenvolvimento** com Docker e visualizar a operação, siga os passos abaixo.

### Pré-requisitos:
Ferramentas necessárias para rodar o projeto:
- **Docker** 🐳<br>
   [Guia de Instalação do Docker](https://docs.docker.com/get-docker/).
- **Docker Compose** 🐳<br>
   [Guia de Instalação do Docker Compose](https://docs.docker.com/compose/install/).
  
### Executando o Projeto com Docker:
- Primeiro configure as variáveis de ambiente a partir do arquivo [*.env-exemplo*](./.env-exemplo)

- Após isso, os comandos abaixo realizam a compilação e execução do projeto:

```sh
docker-compose up --build
```

Esse comando irá compilar a imagem Docker e subir os contêineres para o Django e PostgreSQL, com base nas configurações definidas no [docker-compose.yml](./docker-compose.yml).

> O orquestrador possui apenas dois services (backend e db), ou seja o frontend, por ser algo além do solicitado, não foi dockerizado.

> Para visualizar as rotas do backend, acesse localhost:8000/api/

## Instruções Local: 🚀
Para executar o projeto em **modo de desenvolvimento** localmente e visualizar a operação, siga os passos abaixo.

### Pré-requisitos:
Ferramentas necessárias para rodar o projeto:
- **PostgreSQL**<br>
   Baixe e instale o PostgreSQL no Windows a partir do [site oficial](https://www.postgresql.org/download/windows/).

- **Instalar o psycopg2**<br>
    O psycopg2 é o adaptador de banco de dados PostgreSQL mais popular para Python.
    ```sh
    pip install psycopg2-binary
    ```

> Após a configuração crie no seu banco as tabelas, colunas e as procedures dispostas em _scripts/*_

### Executando o Projeto Local:
- Backend:
    - na pasta _backend/_ rode o comando:
    ```sh
    python manage.py runserver
    ```
> Para visualizar as rotas do backend, acesse localhost:8000/api/

- Frontend
    - em outro terminal, na pasta _frontend/_ rode o comando:
    ```sh
    npm start
    ```
> Para visualizar a aplicação frontend acesse localhost:3000

### Estrutura de pastas:
```
├──.env-exemplo

├──.gitignore

├──.python-version

├──api_test.postman_collection.json

├──CHANGELOG.md

├──CONTRIBUTING.md

├──docker-compose.yml

├──LICENSE

├──Readme.md

├──requirements.txt

scripts/
├── execucoes/
│   ├── exec_atualizar_pessoa.sql
│   ├── exec_inserir_pessoa.sql
│   ├── exec_obter_pessoa.sql
│   ├── exec_remover_pessoa.sql
│   ├── exec_selecionar_todas_pessoas.sql
├── sp_selecionar_todas_pessoas.sql
├── sp_remover_pessoa.sql
├── sp_obter_pessoa.sql
├── sp_atualizar_pessoa.sql
├── sp_inserir_pessoa.sql
├── criar_tabela_pessoas.sql
├── adicionar_indices_pessoas.sql
├── alterar_tabela_pessoas.sql
└── adicionar_chave_unica_cpf.sql

backend/
├── manage.py
├── backend/
│   ├── wsgi.py
│   ├── urls.py
│   ├── settings.py
│   ├── asgi.py
│   └── __init__.py
└── api/
    ├── views.py
    ├── utils.py
    ├── urls.py
    ├── tests.py
    ├── models.py
    ├── apps.py
    ├── admin.py
    └── __init__.py

frontend/
├── .gitignore
├── tsconfig.json
├── README.md
├── package.json
├── package-lock.json
├── src/
│   ├── setupTests.ts
│   ├── reportWebVitals.ts
│   ├── react-app-env.d.ts
│   ├── index.tsx
│   ├── index.css
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── App.css
│   ├── styles/
│   │   └── theme.ts
│   ├── services/
│   │   └── api.ts
│   ├── pages/
│   │   ├── Listagem.tsx
│   │   ├── Cadastro.tsx
│   │   └── index.ts
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── Loading.tsx
│   │   ├── Header.tsx
│   │   ├── FormModal.tsx
│   │   ├── Footer.tsx
│   │   ├── ConfirmDialog.tsx
│   │   └── index.ts
│   └── .gitignore

.idea/
├── workspace.xml

.github/
└── workflows/
    ├── pylint.yml
    └── django.yml

.docker/
├── .dockerignore
└── dev/
    └── Dockerfile
```
> Os scripts de procedures começam todos com 'sp_*', pois são Stored Procedures e essa nomeclatura de arquivo ajuda na localização.

> Os scripts de execução de procedures estão separados em _scripts/execucoes_ e começam com 'exec_*'.

### Procedimento e Melhores Práticas

- PostgreSQL: Integração completa com o Django, utilizando scripts SQL para criação de tabelas, índices e constraints, garantindo a integridade e a performance do banco de dados.

- Docker: Contêineres para Django e PostgreSQL, facilitando a configuração do ambiente de desenvolvimento e produção. As variáveis de ambiente protegem dados sensíveis, como credenciais do banco de dados.

- CI/CD:
    - django.yml: Executa o Django e roda os testes unitários, garantindo que o código esteja funcionando antes de um merge ou deploy.
    - pylint.yml: Verifica a conformidade do código com as boas práticas, prevenindo a introdução de código mal escrito.

- Frontend com React e TypeScript:
    - Componentização: O frontend é estruturado de maneira modular, com componentes reutilizáveis como Sidebar, Header, Footer, além de páginas específicas para Cadastro e Listagem.
    - Validação com Yup: Os formulários no frontend utilizam Yup para validação robusta dos dados de entrada antes de enviá-los para a API.

- Tratamento de Erros: Implementação de verificações robustas para identificar e tratar erros, com respostas informativas para o cliente da API.

- Logging: Adiciona registros de log detalhados para depuração e monitoramento, especialmente útil em ambiente de produção.

- Procedures Flexíveis: Uso do CREATE FUNCTION em vez de CREATE PROCEDURE para permitir retornos diretos e maior flexibilidade no SQL, tornando o sistema mais modular e adaptável.

- Escalabilidade: Arquitetura preparada para escalar horizontalmente (adicionando mais instâncias do serviço) e verticalmente (melhorando a capacidade dos servidores), com foco na eficiência e modularidade.

### Links: 🌐
- _Imagens Docker utilizadas_:<br>
<ins> [Python image 3.10-slim](https://hub.docker.com/layers/library/python/3.10-slim/images/sha256-0d15918ecae76250659ae3036ad1fc898f801f6cb803860bdf0cc4b27fe316dc) </ins> <br>
<ins> [Postgres image](https://hub.docker.com/_/postgres) </ins>

### Licença
Este projeto é licenciado sob a licença [MIT] - veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

### Contribuição
Para qualquer tipo de contribuição no código, consulte [CONTRIBUTING.md](./CONTRIBUTING.md) e saiba como contribuir para esse projeto open source.
