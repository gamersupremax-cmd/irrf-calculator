# Backend - IRRF Calculator API

API REST para cálculo de IRRF (Imposto de Renda Retido na Fonte)

## Requisitos

- Node.js 16+
- PostgreSQL 12+
- npm ou yarn

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do backend:

```env
PORT=3001
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=irrf_calculator
DB_USER=postgres
DB_PASSWORD=sua_senha

# JWT
JWT_SECRET=sua_chave_secreta_super_segura_aqui

# External APIs
NFE_API_URL=https://api.nfe.com.br
NFE_API_KEY=sua_chave_api_nfe
```

## Iniciando

### Desenvolvimento

```bash
npm run dev
```

### Produção

```bash
npm start
```

## Estrutura do Projeto

```
src/
├── index.js           # Arquivo principal
├── middleware/        # Middlewares (auth, errorHandler)
├── routes/           # Rotas da API
├── controllers/      # Lógica de negócio
├── models/          # Modelos de dados
├── services/        # Serviços
├── utils/           # Utilitários (pdf.js)
└── db/              # Conexão com banco
```

## API Endpoints

### Autenticação

- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login

### NFe (protegido)

- `GET /api/nfe/search/:chave` - Buscar informações da NF-e

### IRRF (protegido)

- `POST /api/irrf/calculate` - Calcular IRRF
- `GET /api/irrf/guide/:id` - Baixar guia em PDF
- `GET /api/irrf/history` - Histórico de cálculos

## Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `PORT` | Porta do servidor | Não (padrão: 3001) |
| `NODE_ENV` | Ambiente (development/production) | Não |
| `DB_HOST` | Host do banco de dados | Sim |
| `DB_PORT` | Porta do banco de dados | Sim |
| `DB_NAME` | Nome do banco de dados | Sim |
| `DB_USER` | Usuário do banco de dados | Sim |
| `DB_PASSWORD` | Senha do banco de dados | Sim |
| `JWT_SECRET` | Chave secreta para JWT | Sim |
| `NFE_API_URL` | URL da API de NFe | Não |
| `NFE_API_KEY` | Chave da API de NFe | Não |
