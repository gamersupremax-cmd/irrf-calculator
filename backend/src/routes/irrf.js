import express from 'express';
import { getDb } from '../db/db.js';
import { generateIRRFGuide } from '../utils/pdf.js';

const router = express.Router();

router.post('/calculate', async (req, res) => {
  try {
    const { nfe_chave, valor_total, aliquota, user_id } = req.body;

    if (!nfe_chave || !valor_total || !aliquota) {
      return res.status(400).json({ error: 'Dados obrigatórios faltando' });
    }

    const aliquotasValidas = [0.0020, 0.0024, 0.0120, 0.0240, 0.0480];
    const aliquotaFloat = parseFloat(aliquota) / 100;
    
    if (!aliquotasValidas.includes(aliquotaFloat)) {
      return res.status(400).json({ error: 'Alíquota inválida' });
    }

    const valor_irrf = valor_total * aliquotaFloat;

    const db = getDb();
    const result = db.prepare(
      'INSERT INTO irrf_calculos (user_id, nfe_chave, valor_total, aliquota, valor_irrf) VALUES (?, ?, ?, ?, ?)'
    ).run(user_id || 1, nfe_chave, valor_total, aliquota, valor_irrf);

    res.json({
      id: result.lastID,
      nfe_chave,
      valor_total,
      aliquota: `${aliquota}%`,
      valor_irrf: valor_irrf.toFixed(2),
      valor_liquido: (valor_total - valor_irrf).toFixed(2)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao calcular IRRF' });
  }
});

router.get('/guide/:calculoId', (req, res) => {
  try {
    const { calculoId } = req.params;
    const db = getDb();
    const calculo = db.prepare('SELECT * FROM irrf_calculos WHERE id = ?').get(calculoId);

    if (!calculo) {
      return res.status(404).json({ error: 'Cálculo não encontrado' });
    }

    const pdfBuffer = generateIRRFGuide(calculo);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="guia-irrf-${calculoId}.pdf"`);
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar PDF' });
  }
});

router.get('/history', (req, res) => {
  try {
    const db = getDb();
    const historico = db.prepare(
      'SELECT * FROM irrf_calculos ORDER BY data_criacao DESC LIMIT 50'
    ).all();

    res.json(historico);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar histórico' });
  }
});

export default router;