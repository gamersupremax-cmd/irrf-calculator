import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authMiddleware from './middleware/auth.js';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import nfeRoutes from './routes/nfe.js';
import irrfRoutes from './routes/irrf.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas públicas
app.use('/api/auth', authRoutes);

// Middleware de autenticação
app.use(authMiddleware);

// Rotas protegidas
app.use('/api/nfe', nfeRoutes);
app.use('/api/irrf', irrfRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/health`);
});