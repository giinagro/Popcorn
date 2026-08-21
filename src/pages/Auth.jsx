import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, register } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const res = isRegister ? register(username, password) : login(username, password);

    if (!res.success) {
      setError(res.message);
    }
  };

  return (
    <div className="ticket-booth-wrapper">
      <div className="ticket-booth">
        {/* Cabine Superior / Letreiro */}
        <div className="ticket-marquee">
          <h1 className="ticket-marquee-title">BILHETERIA</h1>
          <p className="ticket-marquee-subtitle">
            {isRegister ? 'Cadastro de Membro' : 'Retirar Ingresso de Entrada'}
          </p>
        </div>

        {/* Janela de Atendimento da Bilheteria */}
        <div className="ticket-window">
          {error && (
            <div style={{ color: '#ffffff', backgroundColor: 'var(--wine-red)', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '0.85rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label style={{fontFamily: 'Segoe UI', fontSize: '0.8rem', fontWeight: '600', color: 'var(--wine-red)', marginBottom: '4px', display: 'block' }}>
              NOME DO CINÉFILO
            </label>
            <input
              type="text"
              className="input-retro"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label style={{ fontFamily: 'Segoe UI', fontSize: '0.8rem', fontWeight: '600', color: 'var(--wine-red)', marginBottom: '4px', display: 'block' }}>
              SENHA
            </label>
            <input
              type="password"
              className="input-retro"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="ticket-stub-btn" style={{ marginTop: '10px' }}>
              {isRegister ? 'CONFIRMAR CADASTRO' : 'ENTRAR NA SESSÃO'}
            </button>
          </form>

          <div style={{ fontFamily: 'Segoe UI', fontWeight: '600',textAlign: 'center', marginTop: '20px' }}>
            <button
              className="like-btn"
              l={{ fontSize: '0.85rem', color: 'var(--wine-red)', textDecoration: 'underline', }}
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
            >
              {isRegister ? 'Já possui ingresso? Faça Login' : 'Primeira vez? Cadastre-se aqui'}
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};