import React, { useState } from 'react';
import { UserService } from '../services/UserService'; 
import { useNavigate } from 'react-router-dom';
import './UserRegister.css';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await UserService.registerUser(formData);
      
      if (result.success) {
        navigate('/UserLogin', { state: { registrationSuccess: true } });
      } else {
        setError(result.error || 'Error en el registro. Por favor intente nuevamente.');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Crear Nueva Cuenta</h2>
        <p>Complete el formulario para registrarse</p>
        
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Ej: Azalia"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              autoComplete="name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Ej: usuario@dominio.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              autoComplete="email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              autoComplete="new-password"
              minLength="8"
            />
          </div>
          
          <button 
            type="submit" 
            className="primary-button"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span> Registrando...
              </>
            ) : 'Registrarse'}
          </button>

          <div className="login-link">
            ¿Ya tienes una cuenta?{' '}
            <button 
              type="button"
              onClick={() => navigate('/UserLogin')}
              className="link-button"
              disabled={loading}
            >
              Inicia sesión aquí
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;