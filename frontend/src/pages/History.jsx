import React, { useEffect, useState } from 'react';
import { irrfAPI } from '../services/api';
import './History.css';

const History = () => {
  const [calculos, setCalculos] = useState([]);
  const [filteredCalculos, setFilteredCalculos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await irrfAPI.getHistory();
      setCalculos(response.data);
      setFilteredCalculos(response.data);
    } catch (err) {
      setError('Erro ao buscar histórico');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = calculos.filter(
      (calculo) =>
        calculo.nfe_chave.includes(searchTerm) ||
        calculo.valor_total.toString().includes(searchTerm) ||
        calculo.valor_irrf.toString().includes(searchTerm)
    );
    setFilteredCalculos(filtered);
  }, [searchTerm, calculos]);

  const handleDownloadGuide = async (calculoId) => {
    try {
      const response = await irrfAPI.getGuide(calculoId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `guia-irrf-${calculoId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      setError('Erro ao baixar guia');
    }
  };

  if (loading) {
    return (
      <div className="container history-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando histórico...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container history-container">
      <div className="history-header">
        <h1>📁 Histórico de Cálculos</h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="history-filters">
        <input
          type="text"
          placeholder="🔍 Buscar por chave, valor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCalculos.length > 0 ? (
        <div className="history-table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Chave NF-e</th>
                <th>Valor Total</th>
                <th>Alíquota</th>
                <th>IRRF</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCalculos.map((calculo) => (
                <tr key={calculo.id}>
                  <td>#{calculo.id}</td>
                  <td title={calculo.nfe_chave}>
                    {calculo.nfe_chave.substring(0, 20)}...
                  </td>
                  <td>R$ {parseFloat(calculo.valor_total).toFixed(2)}</td>
                  <td>{parseFloat(calculo.aliquota).toFixed(2)}%</td>
                  <td>
                    <strong>R$ {parseFloat(calculo.valor_irrf).toFixed(2)}</strong>
                  </td>
                  <td>
                    {new Date(calculo.data_criacao).toLocaleDateString('pt-BR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-small btn-download-sm"
                        onClick={() => handleDownloadGuide(calculo.id)}
                        title="Baixar guia em PDF"
                      >
                        📥 PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <p>📋 Nenhum cálculo encontrado</p>
          <a href="/calculadora">Ir para Calculadora</a>
        </div>
      )}
    </div>
  );
};

export default History;