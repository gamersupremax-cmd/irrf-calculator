import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>📊 IRRF Calculator</h1>
        </div>
        <nav className="nav-menu">
          <a href="/" className="nav-link">Início</a>
          <a href="/calculadora" className="nav-link">Calculadora</a>
          <a href="/historico" className="nav-link">Histórico</a>
        </nav>
        <div className="user-menu">
          <span className="user-name">👤 {user?.name || user?.email}</span>
          <button className="btn-logout" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;