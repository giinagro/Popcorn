import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { PopcornLogo } from './PopcornLogo';

export const Navbar = ({ onOpenCreateModal }) => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const defaultSilhouette = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23721121'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand-link">
        <PopcornLogo />
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Feed</Link>
        <Link to="/explore" className="nav-link">Explorar</Link>
        <Link to="/profile" className="nav-link nav-profile-link">
          <img
            src={currentUser?.avatar || defaultSilhouette}
            alt="Foto de perfil"
            className="nav-avatar"
          />
          <span>Perfil ({currentUser?.username})</span>
        </Link>
        <button className="btn-retro btn-retro-gold" onClick={onOpenCreateModal}>
          + Indicar
        </button>
        <button className="btn-retro" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </nav>
  );
};