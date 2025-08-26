import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import '../styles/login.css';

const loginSchema = z.object({
  email: z.string().email({ message: "Correo inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "Nombre requerido" }),
  apellido: z.string().min(2, { message: "Apellidos requeridos" }),
  fechaNacimiento: z.string().min(1, { message: "Fecha de nacimiento requerida" })
    .refine((val) => {
      const birthDate = new Date(val);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18;
    }, { message: "Debes tener al menos 18 años" }),
  nacionalidad: z.string().min(3, { message: "Nacionalidad requerida" }),
  genero: z.string().min(1, { message: "Selecciona el Género" }),
  email: z.string().email({ message: "Correo inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({ 
    resolver: zodResolver(isRegistering ? registerSchema : loginSchema) 
  });

  const onSubmit = (data) => {
    console.log(isRegistering ? "Registro:" : "Login:", data);
  };

  return (
    <div className="login-master-container">
      <div className="login-container">
        <section className="login-header">
          <h1>🌱 Bienvenido a MercArt</h1>
        </section>

        <div className="login-content">
          <div className="login-form-section">
            <div className="login-form-container">
              <p>
                {isRegistering 
                  ? "Crea tu cuenta para comenzar a comprar." 
                  : "Inicia sesión para continuar con tu experiencia de compra."
                }
              </p>
              
              <div className="button-selector">
                <button 
                  className={`selector-btn ${!isRegistering ? 'active' : ''}`}
                  onClick={() => setIsRegistering(false)}
                >
                  Iniciar Sesión
                </button>
                <button 
                  className={`selector-btn ${isRegistering ? 'active' : ''}`}
                  onClick={() => setIsRegistering(true)}
                >
                  Crear Cuenta
                </button>
              </div>
              
              <img
                src="https://i.postimg.cc/44KR9BZZ/merckart.png"
                alt="MercArt Logo"
                className="login-logo"
              />
              
              <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                {isRegistering && (
                  <>
                    <div className="form-group">
                      <label htmlFor="name">Nombre:</label>
                      <input 
                        type="text" 
                        id="name" 
                        {...register("name")} 
                        placeholder="ej. Carlos" 
                      />
                      {errors.name && <span className="error-message">{errors.name.message}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="apellido">Apellidos:</label>
                      <input 
                        type="text" 
                        id="apellido" 
                        {...register("apellido")} 
                        placeholder="ej. Perez García" 
                      />
                      {errors.apellido && <span className="error-message">{errors.apellido.message}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                      <input 
                        type="date" 
                        id="fechaNacimiento" 
                        {...register("fechaNacimiento")} 
                      />
                      {errors.fechaNacimiento && <span className="error-message">{errors.fechaNacimiento.message}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="nacionalidad">Nacionalidad:</label>
                      <select 
                        id="nacionalidad" 
                        {...register("nacionalidad")}
                        defaultValue=""
                      >
                        <option value="" disabled>Selecciona tu nacionalidad</option>
                        <option value="mexicana">Mexicana</option>
                        <option value="estadounidense">Estadounidense</option>
                        <option value="colombiana">Colombiana</option>
                        <option value="española">Española</option>
                        <option value="argentina">Argentina</option>
                        <option value="otra">Otra</option>
                      </select>
                      {errors.nacionalidad && <span className="error-message">{errors.nacionalidad.message}</span>}
                    </div>

                    <div className="form-group">
                      <label>Género:</label>
                      <select id="genero"
                      {...register("genero")}
                        defaultValue=""
                      >
                        <option value="" disabled>Selecciona tu género</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                        <option value="Prefiero no decirlo">Prefiero no decirlo</option>
      
                      </select>
                      {errors.genero && <span className="error-message">{errors.genero.message}</span>}
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico:</label>
                  <input 
                    type="email" 
                    id="email" 
                    {...register("email")} 
                    placeholder="ejemplo@correo.com" 
                  />
                  {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Contraseña:</label>
                  <div className="input-with-icon">
                    <input 
                      type={showPassword ? "text" : "password"}
                      id="password" 
                      {...register("password")}
                      placeholder="Contraseña"
                    />
                    <span 
                      className="toggle-visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      role="button"
                      aria-label="Mostrar u ocultar contraseña"
                    >
                      {showPassword ? "🙈" : "🙉"}
                    </span>
                  </div>
                  {errors.password && <span className="error-message">{errors.password.message}</span>}
                </div>

                <button type="submit" className="login-submit-btn">
                  {isRegistering ? "Registrarse" : "Iniciar Sesión"}
                </button>
              </form>
            </div>
          </div>
          
          <div className="login-image-section">
            <img 
              src="https://images.pexels.com/photos/3585089/pexels-photo-3585089.jpeg"
              alt="Ilustración de login"
              className="login-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}