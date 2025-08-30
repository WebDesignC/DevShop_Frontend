import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de login:', formData);
    // Aquí iría la lógica de autenticación
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">Iniciar Sesión</h1>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="login-button">Ingresar</button>
        </form>

        <div className="login-divider">
          <span>¿No tienes cuenta?</span>
        </div>

        <Link to="/register" className="register-link">
          Crear una cuenta
        </Link>

        <div className="login-footer">
          <Link to="/" className="back-link">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};