# Fullstack Guides

Reference guides and roadmaps for building fullstack web apps with Node/Express + React + PostgreSQL.

## Stack

- **Backend** — Node.js, Express, TypeScript, PostgreSQL
- **Frontend** — React, TypeScript, Tailwind CSS, Vite
- **Auth** — JWT (local) + Google OAuth 2.0

---

## Ordem de estudo

| Ficheiro | O que cobre |
|---|---|
| `01-project-roadmap.md` | **[ROADMAP]** Projeto do zero — backend + frontend com dados em memória |
| `02-postgres-migration-roadmap.md` | **[ROADMAP]** Migrar de memória para PostgreSQL |
| `03-auth-roadmap.md` | **[ROADMAP]** Adicionar JWT auth + Google OAuth |
| `05-git-workflow.md` | Git — branches, commits, pull requests |
| `06-async-recap.md` | Promises, async/await, tratamento de erros |
| `07-express-recap.md` | Express — routing, middleware, req/res |
| `08-api-recap.md` | REST API — métodos HTTP, status codes, design |
| `09-postgres-recap.md` | PostgreSQL — `pg`, SQL, queries parametrizadas |
| `10-prisma-recap.md` | Prisma ORM — schema, migrations, CRUD, relações |
| `11-auth-recap.md` | Auth — JWT, bcrypt, sessões (teoria) |
| `12-api-auth-recap.md` | Auth na API — tokens, headers, rotas protegidas |
| `13-auth-security-bonus.md` | Segurança — httpOnly cookies, XSS, CSRF |
| `14-zod-recap.md` | Zod — validação de schemas, inferência de tipos |
| `15-react-hooks-recap.md` | React — useState, useEffect, useContext, hooks custom |
| `16-react-router-recap.md` | React Router v7 — rotas, navegação, loaders, auth |
| `17-axios-recap.md` | Axios — pedidos HTTP do backend para APIs externas |
| `18-tailwind-recap.md` | Tailwind CSS — classes utilitárias, responsive |
| `19-vitest-recap.md` | Vitest + Testing Library — testes unitários e de componentes |
| `20-playwright-recap.md` | Playwright — testes end-to-end, locators, auth reuse |
| `21-deploy-guide.md` | **[DEPLOY]** Vercel + Render + Neon (free tier) |

---

## Lógica da ordem

```
Git → JS assíncrono → Backend (Express → API → DB → Auth → Validação)
                    → Frontend (React → Router → Axios → Tailwind)
                    → Testes (Vitest → Playwright)
```

Começa sempre pelo backend — o frontend só faz sentido quando há uma API a consumir.

---

## Correr um projeto localmente

**Requisitos:** Node.js, PostgreSQL local. Cria um ficheiro `.env` dentro de `<project>-api/`:

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=<project>
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_random_secret
GOOGLE_CLIENT_ID=your_google_client_id         # opcional, para OAuth
GOOGLE_CLIENT_SECRET=your_google_client_secret # opcional, para OAuth
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

Corre `<project>-api/db/schema.sql` no pgAdmin para criar as tabelas.

**Backend**
```bash
cd <project>-api
npm run compile
npm start
```

**Frontend**
```bash
cd <project>-client
npm run dev
```

Backend corre em `http://localhost:3000`, frontend em `http://localhost:5173`.
