import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RegisterPage.css';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    console.log('Datos de registro:', formData);
    // Aquí iría la lógica de registro
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <h1 className="register-title">Crear Cuenta</h1>
        
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

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

          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="register-button">Registrarse</button>
        </form>

        <div className="register-divider">
          <span>¿Ya tienes cuenta?</span>
        </div>

        <Link to="/login" className="login-link">
          Iniciar sesión
        </Link>

        <div className="register-footer">
          <Link to="/" className="back-link">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};