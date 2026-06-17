# 📊 IRRF Calculator - Sistema de Cálculo de IRRF

Sistema web para cálculo automático de IRRF (Imposto de Renda Retido na Fonte) em notas fiscais com geração de guia para impressão.

## ✨ Funcionalidades

- 🔐 **Autenticação segura** - Login/senha simples
- 📱 **Leitura de código de barras** - Scanner ou entrada manual
- 📄 **Integração com API NF-e** - Busca automaticamente dados da nota
- 💰 **Cálculo de IRRF** - Automático com 5 alíquotas
- 🖨️ **Geração de Guia** - PDF pronto para imprimir e anexar

## 🎯 Alíquotas Disponíveis

- 0,20%
- 0,24%
- 1,20%
- 2,40%
- 4,80%

## 📦 Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: SQLite (simples, sem configuração)
- **Autenticação**: JWT
- **PDF**: pdfkit

## 🚀 Começando Rápido

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/gamersupremax-cmd/irrf-calculator.git
cd irrf-calculator

# 2. Instale dependências do backend
cd backend
npm install

# 3. Configure o banco de dados
npm run db:setup

# 4. Inicie o servidor backend
npm start

# 5. Em outro terminal, configure o frontend
cd ../frontend
npm install

# 6. Inicie o frontend
npm run dev
```

Acesse: **http://localhost:5173**

## 📁 Estrutura do Projeto

```
irrf-calculator/
├── backend/                 # API Express
│   ├── src/
│   │   ├── routes/         # Rotas da API
│   │   ├── controllers/    # Lógica das rotas
│   │   ├── models/         # Models do banco
│   │   ├── middleware/     # JWT, validação
│   │   └── utils/          # Utilitários
│   ├── db/                 # Banco SQLite
│   └── package.json
│
├── frontend/               # App React
│   ├── src/
│   │   ├── pages/         # Páginas (Login, Dashboard, etc)
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── services/      # Chamadas API
│   │   ├── context/       # Context API (autenticação)
│   │   └── App.jsx
│   └── package.json
│
└── docs/                   # Documentação
```

## 🔐 Segurança

- Senhas criptografadas com bcrypt
- JWT para autenticação
- Validação de entrada em cliente e servidor
- CORS configurado

## 📖 Documentação Completa

Veja [GUIA.md](./docs/GUIA.md) para tutorial passo a passo.

---

**Criado para iniciantes** ❤️ | Fácil de aprender e expandir
