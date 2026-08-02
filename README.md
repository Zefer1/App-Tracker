# App Tracker

Esta é uma aplicação full-stack para gerir candidaturas a emprego. Regista-te, adiciona candidaturas, altera o estado de cada uma consoante o desenvolvimento (sem resposta, entrevista, oferta, recusado) e mantém tudo organizado num só sítio.

Projeto construído do zero. Schema da base de dados, API REST com autenticação real, e frontend React ligado a ela como forma de consolidar competências técnicas de forma prática, depois de identificar lacunas concretas numa entrevista. A IA foi usada pontualmente para depurar bugs específicos mais difíceis de identificar, não para escrever a lógica do projeto.

## Stack

**Frontend**
- React + TypeScript
- Vite
- React Router (routing declarativo)
- Tailwind CSS
- Context API (dark/light theme)

**Backend**
- Node.js + Express
- PostgreSQL (via `node-postgres`)
- JWT em cookie `httpOnly` para autenticação
- bcrypt para hash de passwords

## Funcionalidades

- Registo e login com password encriptada (bcrypt)
- Autenticação via JWT guardado em cookie `httpOnly` (protegido contra XSS)
- CRUD completo de candidaturas criar, listar, editar, apagar
- Cada candidatura pertence sempre ao utilizador autenticado o `user_id` nunca vem do cliente, é sempre extraído do token verificado no servidor
- Validação de inputs no backend (campos obrigatórios, formatos, duplicados)
- Editar perfil (nome/password) e apagar conta (com confirmação de password)
- Dark/light mode, persistente entre sessões
- Layout responsivo (grelha de candidaturas adapta o número de colunas à largura do ecrã)

## Como correr localmente

### Pré-requisitos
- Node.js
- PostgreSQL

### 1. Clonar e instalar dependências
```bash
git clone https://github.com/Zefer1/App-Tracker.git
cd App-Tracker

cd server
npm install

cd ../client
npm install
```

### 2. Base de dados

Cria uma base de dados PostgreSQL e corre o schema:
```bash
psql -U o_teu_user -d nome_da_bd -f server/src/db/schema.sql
```
(ou cola o conteúdo de `server/src/db/schema.sql` no Query Tool do pgAdmin)

### 3. Variáveis de ambiente

Cria um ficheiro `.env` dentro de `server/`:
```
DB_USER=o_teu_user
DB_HOST=localhost
DB_NAME=nome_da_bd
DB_PASSWORD=a_tua_password
DB_PORT=5432
JWT_SECRET=uma_string_longa_e_aleatoria
NODE_ENV=development
```

### 4. Correr o projeto

Em dois terminais separados:
```bash
# terminal 1 - backend
cd server
npm run dev

# terminal 2 - frontend
cd client
npm run dev
```

Backend em `http://localhost:3000`, frontend em `http://localhost:5173`.

## Estrutura do projeto

```
App-Tracker/
├── server/
│   └── src/
│       ├── controllers/    # lógica de cada rota
│       ├── routes/         # mapeamento URL → controller
│       ├── middleware/     # autenticação (JWT)
│       ├── db/             # ligação à BD + schema.sql
│       └── app.ts          # servidor Express
│
└── client/
    └── src/
        ├── pages/           # uma página por rota
        ├── components/      # peças reutilizáveis (Header, Layout, ProtectedRoute...)
        ├── context/         # tema dark/light
        └── types/           # tipos TypeScript partilhados
```

## Decisões técnicas que valem a pena mencionar

- **Ownership sempre pelo token, nunca pelo cliente** Nenhuma rota aceita `user_id` vindo do body ou dos parâmetros do URL; vem sempre do JWT já verificado. Isto foi corrigido a meio do desenvolvimento depois de identificar que a versão inicial permitia a um utilizador autenticado escrever dados na conta de outro.
- **Cookie `httpOnly` em vez de `localStorage`** para o JWT, o token nunca é acessível a JavaScript no browser, reduzindo a superfície de ataque XSS.
- **Updates parciais com `COALESCE`** Os endpoints de edição só alteram os campos enviados, mantendo os restantes intactos.
