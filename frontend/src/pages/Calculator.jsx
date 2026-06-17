import React, { useState } from 'react';
import { irrfAPI } from '../services/api';
import './Calculator.css';

const Calculator = () => {
  const [nfeChave, setNfeChave] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [aliquota, setAliquota] = useState('0.20');
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const aliquotasDisponiveis = [
    { valor: 0.20, label: '0,20%' },
    { valor: 0.24, label: '0,24%' },
    { valor: 1.20, label: '1,20%' },
    { valor: 2.40, label: '2,40%' },
    { valor: 4.80, label: '4,80%' },
  ];

  const handleCalculate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nfeChave || !valorTotal || !aliquota) {
      setError('Preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      const response = await irrfAPI.calculate(nfeChave, parseFloat(valorTotal), aliquota);
      setResultado(response.data);
      setSuccess('Cálculo realizado com sucesso!');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao calcular');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadGuide = async () => {
    if (!resultado?.id) return;

    try {
      const response = await irrfAPI.getGuide(resultado.id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `guia-irrf-${resultado.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      setError('Erro ao baixar guia');
    }
  };

  return (
    <div className="container calculator-container">
      <h1>📊 Calculadora de IRRF</h1>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="calculator-section">
        <h2>Dados da Nota Fiscal</h2>
        <form onSubmit={handleCalculate}>
          <div className="form-group">
            <label htmlFor="nfeChave">Chave da NF-e (44 dígitos)</label>
            <input
              id="nfeChave"
              type="text"
              value={nfeChave}
              onChange={(e) => setNfeChave(e.target.value.replace(/\D/g, '').slice(0, 44))}
              placeholder="Ex: 35220112345678901234567890123456789012345"
              maxLength="44"
            />
          </div>

          <div className="form-group">
            <label htmlFor="valorTotal">Valor Total (R$)</label>
            <input
              id="valorTotal"
              type="number"
              step="0.01"
              value={valorTotal}
              onChange={(e) => setValorTotal(e.target.value)}
              placeholder="Ex: 1000.00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="aliquota">Alíquota de Retenção (%)</label>
            <select
              id="aliquota"
              value={aliquota}
              onChange={(e) => setAliquota(e.target.value)}
            >
              {aliquotasDisponiveis.map((aq) => (
                <option key={aq.valor} value={aq.valor}>
                  {aq.label}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-calculate" disabled={loading}>
            {loading ? '⏳ Calculando...' : '🧮 Calcular'}
          </button>
        </form>

        <div className="info-box">
          💡 Dica: Você pode colar o código de barras da nota fiscal para preencher automaticamente a chave.
        </div>
      </div>

      {resultado && (
        <div className="calculator-section">
          <h2>Resultado do Cálculo</h2>

          <div className="result-box">
            <div className="label">Valor Total da NF-e</div>
            <div className="value">R$ {parseFloat(resultado.valor_total).toFixed(2)}</div>
          </div>

          <div className="result-box">
            <div className="label">IRRF a Descontar ({resultado.aliquota})</div>
            <div className="value">R$ {resultado.valor_irrf}</div>
          </div>

          <div className="result-box">
            <div className="label">Valor Líquido</div>
            <div className="value">R$ {resultado.valor_liquido}</div>
          </div>

          <div className="button-group">
            <button
              type="button"
              className="btn-download"
              onClick={handleDownloadGuide}
            >
              📥 Baixar Guia (PDF)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;