import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { irrfAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, ultimos: 0 });
  const [recentCalculos, setRecentCalculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await irrfAPI.getHistory();
        const calculos = response.data;
        
        setRecentCalculos(calculos.slice(0, 5));
        
        const total = calculos.reduce((sum, c) => sum + parseFloat(c.valor_irrf), 0);
        setStats({
          total: total.toFixed(2),
          ultimos: calculos.slice(0, 30).reduce((sum, c) => sum + parseFloat(c.valor_irrf), 0).toFixed(2)
        });
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  if (loading) {
    return (
      <div className="container dashboard-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container dashboard-container">
      <div className="dashboard-header">
        <h1>📊 Bem-vindo, {user?.name || user?.email}!</h1>
        <p>Gerencie seus cálculos de IRRF aqui</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card success">
          <h3>Total Retido</h3>
          <div className="value">R$ {stats.total}</div>
        </div>
        <div className="stat-card warning">
          <h3>Últimos 30 dias</h3>
          <div className="value">R$ {stats.ultimos}</div>
        </div>
        <div className="stat-card">
          <h3>Cálculos Realizados</h3>
          <div className="value">{recentCalculos.length}</div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>🚀 Ações Rápidas</h2>
        <div className="actions-grid">
          <button
            className="action-btn"
            onClick={() => handleNavigate('/calculadora')}
          >
            🧮 Novo Cálculo
          </button>
          <button
            className="action-btn"
            onClick={() => handleNavigate('/historico')}
          >
            📁 Ver Histórico
          </button>
        </div>
      </div>

      {recentCalculos.length > 0 && (
        <div className="recent-section">
          <h2>📄 Últimos Cálculos</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Chave NF-e</th>
                <th>Valor Total</th>
                <th>IRRF</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {recentCalculos.map((calculo) => (
                <tr key={calculo.id}>
                  <td>{calculo.nfe_chave?.substring(0, 20)}...</td>
                  <td>R$ {parseFloat(calculo.valor_total).toFixed(2)}</td>
                  <td>R$ {parseFloat(calculo.valor_irrf).toFixed(2)}</td>
                  <td>{new Date(calculo.data_criacao).toLocaleDateString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;