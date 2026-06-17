# Frontend - IRRF Calculator

Aplicação React para cálculo de IRRF (Imposto de Renda Retido na Fonte)

## Requisitos

- Node.js 16+
- npm ou yarn

## Instalação

```bash
npm install
```

## Configuração

A API está configurada para usar `http://localhost:3001/api` por padrão.

Para usar uma URL diferente, crie um arquivo `.env`:

```env
VITE_API_URL=https://api.seudominio.com
```

## Iniciando

### Desenvolvimento

```bash
npm run dev
```

A aplicação abrirá em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão em `dist/`

### Preview de Produção

```bash
npm run preview
```

## Estrutura do Projeto

```
src/
├── main.jsx              # Ponto de entrada
├── App.jsx              # Componente principal
├── index.css            # Estilos globais
├── components/          # Componentes reutilizáveis
│   └── Header.jsx      # Cabeçalho da aplicação
├── context/            # Context API
│   └── AuthContext.jsx # Contexto de autenticação
├── pages/              # Páginas da aplicação
│   ├── Login.jsx       # Página de login
│   ├── Register.jsx    # Página de registro
│   ├── Dashboard.jsx   # Dashboard principal
│   ├── Calculator.jsx  # Calculadora de IRRF
│   └── History.jsx     # Histórico de cálculos
└── services/           # Serviços de API
    └── api.js         # Configuração do Axios
```

## Funcionalidades

- 🔐 Autenticação com JWT
- 📊 Dashboard com estatísticas
- 🧮 Calculadora de IRRF
- 📋 Histórico de cálculos
- 📄 Geração de guia em PDF
- 🔍 Busca e filtros
- 📱 Interface responsiva

## Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `VITE_API_URL` | URL da API backend | `http://localhost:3001/api` |

## Build para Produção

Antes de fazer o build, certifique-se de:

1. Testar todas as funcionalidades localmente
2. Configurar `VITE_API_URL` para a URL de produção
3. Executar `npm run build`
4. Fazer o deploy dos arquivos de `dist/`
