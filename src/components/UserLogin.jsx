import React, { useState } from 'react';
import useUsers from '../hooks/useUsers';
import { useNavigate } from 'react-router-dom';
import './UserLogin.css';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { loading, error, handleLogin } = useUsers(); 

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await handleLogin({ email, password });
    
    if (result.success) {
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            id="email"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="login-btn"
        >
          {loading ? (
            <>
              <span className="spinner"></span> Cargando...
            </>
          ) : (
            'Ingresar'
          )}
        </button>

        <button 
          type="button"
          onClick={() => navigate('/UserRegister')}
          className="registration-btn"
          disabled={loading}
        >
          Crear nueva cuenta
        </button>
      </form>
    </div>
  );
};

export default UserLogin;