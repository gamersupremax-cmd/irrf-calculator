import express from 'express';

const router = express.Router();

router.get('/search/:chave', async (req, res) => {
  try {
    const { chave } = req.params;

    if (!chave || chave.length !== 44) {
      return res.status(400).json({ error: 'Chave de NF-e inválida (deve ter 44 dígitos)' });
    }

    const mockData = {
      chave: chave,
      numero: '123456',
      serie: '1',
      emitente: 'Empresa LTDA',
      valor_total: 1000.00,
      data_emissao: new Date().toISOString(),
      status: 'autorizado'
    };

    res.json(mockData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar NF-e' });
  }
});

router.post('/mock', (req, res) => {
  res.json({
    chave: '35220112345678901234567890123456789012345',
    numero: '123456',
    serie: '1',
    emitente: 'Empresa Teste LTDA',
    cnpj_emitente: '12.345.678/0001-90',
    valor_total: 5000.00,
    data_emissao: new Date().toISOString(),
    status: 'autorizado',
    produtos: [
      { descricao: 'Produto 1', quantidade: 10, valor_unitario: 500 }
    ]
  });
});

export default router;