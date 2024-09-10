# Node MySQL API

Este projeto é uma API RESTful construída com Node.js e Express, utilizando MySQL como banco de dados. Ele inclui funcionalidades de autenticação JWT e operações CRUD (Create, Read, Update, Delete) para posts de usuários.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL
- npm (gerenciador de pacotes do Node.js)

## Configuração do Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/node-myslq-api.git
   cd node-myslq-api
2. Instale as dependências:
    npm install
3. Configure o banco de dados MySQL:

Crie um banco de dados no MySQL.
Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente:
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco_de_dados
JWT_KEY=sua_chave_secreta

4. Execute as migrações do banco de dados (se aplicável):
    npx sequelize-cli db:migrate

5. Inicie o servidor:
    node server.js
    (O servidor estará rodando em http://localhost:5000.)


Configuração do Frontend
1.  Navegue até o diretório do frontend:

    cd my-frontend

2. Instale as dependências
    npm install

3. Inicie o servidor do React:
    npm start
    (O servidor do frontend estará rodando em http://localhost:3000.)

Funcionalidades:

Autenticação
Login: Os usuários podem fazer login para obter um token JWT.
Registro: Os usuários podem se registrar para criar uma nova conta.
CRUD de Posts
Criar Post: Os usuários autenticados podem criar novos posts.
Ler Posts: Os usuários podem visualizar todos os posts.
Atualizar Post: Os usuários autenticados podem atualizar seus próprios posts.
Deletar Post: Os usuários autenticados podem deletar seus próprios posts.
Endpoints da API
Autenticação
POST /api/users/login: Login do usuário.
POST /api/users/register: Registro do usuário.
Posts
GET /api/posts: Obter todos os posts.
POST /api/posts: Criar um novo post (requer autenticação).
GET /api/posts/:id: Obter um post específico.
PUT /api/posts/:id: Atualizar um post específico (requer autenticação).
DELETE /api/posts/:id: Deletar um post específico (requer autenticação).