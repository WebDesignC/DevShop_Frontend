import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle } from 'react-icons/fa';
import '../styles/login.css';

// URL base de tu API
const API_BASE_URL = "https://mercartback.vercel.app";

// Esquemas de validación
const loginSchema = z.object({
  email: z.string().email({ message: "Correo inválido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
});

const registerSchema = z.object({
  nombre: z.string().min(2, { message: "Nombre requerido" }),
  apellidos: z.string().min(2, { message: "Apellidos requeridos" }),
  fechaNacimiento: z.string().min(1, { message: "Fecha requerida" })
    .refine((val) => {
      const birthDate = new Date(val);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18;
    }, { message: "Debes tener al menos 18 años" }),
  nacionalidad: z.string().min(3, { message: "Nacionalidad requerida" }),
  genero: z.string().min(1, { message: "Selecciona el Género" }),
  email: z.string().email({ message: "Correo inválido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
});

export const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  
  const firstInputRef = useRef(null);
  const emailInputRef = useRef(null);
  
  const { register, handleSubmit, formState: { errors }, reset, setFocus, trigger } = useForm({ 
    resolver: zodResolver(isRegistering ? registerSchema : loginSchema),
    mode: "onChange"
  });

  const toggleFormMode = (isRegister) => {
    setShowErrors(false);
    setAuthError("");
    setAuthSuccess("");
    setIsRegistering(isRegister);
    reset();
    
    setTimeout(() => {
      if (firstInputRef.current) firstInputRef.current.focus();
    }, 100);
  };

  useEffect(() => {
    if (isRegistering) {
      setTimeout(() => {
        if (firstInputRef.current) firstInputRef.current.focus();
      }, 100);
    } else {
      setTimeout(() => {
        if (emailInputRef.current) emailInputRef.current.focus();
      }, 100);
    }
  }, [isRegistering]);
  // Manejo del submit con validaciones Mejorado
  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError("");
    setAuthSuccess("");

    try {
      // Validación simple en cliente (evita enviar requests inválidos)
      if (isRegistering) {
        const required = ["nombre", "apellidos", "fechaNacimiento", "nacionalidad", "genero", "email", "password"];
        const missing = required.filter((k) => !data[k] || (typeof data[k] === "string" && data[k].trim() === ""));
        if (missing.length) {
          throw new Error("Completa todos los campos requeridos.");
        }
      } else {
        if (!data.email || !data.password) {
          throw new Error("Completa el correo y la contraseña.");
        }
      }

      if (isRegistering) {
        // Armar payload exactamente como tu schema de Mongoose espera
        const payload = {
          nombre: data.nombre,
          apellidos: data.apellidos,
          fechaNacimiento: data.fechaNacimiento,
          nacionalidad: data.nacionalidad,
          genero: data.genero,
          email: data.email,
          password: data.password
        };

        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          // intentar leer mensaje JSON del backend, si existe
          let errMsg = `Error en el registro (${response.status})`;
          try {
            const err = await response.json();
            errMsg = err.message || JSON.stringify(err);
          } catch (e) { /* ignore parse error */ }
          throw new Error(errMsg);
        }

        const newUser = await response.json();
        const displayName = newUser.nombre || newUser.name || newUser.email || "usuario";
        setAuthSuccess(`¡Cuenta creada exitosamente! Bienvenido/a ${displayName}`);

        // Cambiar a modo login después de registro exitoso
        setTimeout(() => {
          setIsRegistering(false);
          reset();
        }, 1500);
      } else {
        // Login
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email, password: data.password }),
        });

        if (!response.ok) {
          let errMsg = `Error en el login (${response.status})`;
          try {
            const err = await response.json();
            errMsg = err.message || JSON.stringify(err);
          } catch (e) { /* ignore parse error */ }
          throw new Error(errMsg);
        }

        const userData = await response.json();
        // Ser tolerante con la forma de la respuesta del backend
        const user = userData.user || userData;
        const token = userData.token || userData.accessToken || null;
        const displayName = (user && (user.nombre || user.name || user.email)) || "usuario";

        setAuthSuccess(`¡Bienvenido de nuevo ${displayName}!`);

        if (token) {
          localStorage.setItem("authToken", token);
        }
        // opcional: guardar info mínima del usuario
        try {
          localStorage.setItem("authUser", JSON.stringify(user));
        } catch (e) { /* ignore */ }

        // Redirigir a inicio con sesion iniciada... A chambiar 
      }
    } catch (error) {
      setAuthError(error.message || "Ocurrió un error inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  // Función para login con Google
  const loginWithGoogle = () => {
    setGoogleLoading(true);
    setAuthError("");
    
    // Redirigir a la ruta de autenticación de Google en tu backend
    window.location.href = `${API_BASE_URL}/api/auth/google`;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const isValid = await trigger();
    
    if (isValid) {
      handleSubmit(onSubmit)();
    } else {
      setShowErrors(true);
      setAuthError("Completa todos los campos requeridos.");
      
      const errorFields = Object.keys(errors);
      if (errorFields.length > 0) {
        setFocus(errorFields[0]);
      }
    }
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
                  type="button"
                  className={`selector-btn ${!isRegistering ? 'active' : ''}`}
                  onClick={() => toggleFormMode(false)}
                  disabled={isLoading || googleLoading}
                >
                  Iniciar Sesión
                </button>
                <button 
                  type="button"
                  className={`selector-btn ${isRegistering ? 'active' : ''}`}
                  onClick={() => toggleFormMode(true)}
                  disabled={isLoading || googleLoading}
                >
                  Crear Cuenta
                </button>
              </div>
              
              <img
                src="https://i.postimg.cc/44KR9BZZ/merckart.png"
                alt="MercArt Logo"
                className="login-logo"
              />
              
              {/* Botón de Google con mejor diseño */}
              <div className="google-auth-section">
                <button 
                  className="google-auth-btn"
                  onClick={loginWithGoogle}
                  disabled={googleLoading || isLoading}
                  type="button"
                >
                  <div className="google-btn-content">
                    <FaGoogle className="google-icon" />
                    {googleLoading ? 'Procesando...' : 'Continuar con Google'}
                  </div>
                </button>
                
                <div className="separator">
                  <span>o</span>
                </div>
              </div>
              
              {/* Mensajes de éxito y error */}
              {authError && <div className="auth-message error">{authError}</div>}
              {authSuccess && <div className="auth-message success">{authSuccess}</div>}
              
              <form className="login-form" onSubmit={handleFormSubmit}>
                {isRegistering && (
                  <>
                    <div className="form-group">
                      <label htmlFor="name">Nombre:</label>
                      <input 
                        type="text" 
                        id="name" 
                        {...register("nombre")} 
                        placeholder="ej. Carlos"
                        ref={(e) => {
                          register("nombre").ref(e);
                          firstInputRef.current = e;
                        }}
                        disabled={isLoading || googleLoading}
                      />
                      {showErrors && errors.name && <span className="error-message">{errors.name.message}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="apellidos">Apellidos:</label>
                      <input 
                        type="text" 
                        id="apellidos" 
                        {...register("apellidos")} 
                        placeholder="ej. Perez García" 
                        disabled={isLoading || googleLoading}
                      />
                      {showErrors && errors.apellidos && <span className="error-message">{errors.apellidos.message}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                      <input 
                        type="date" 
                        id="fechaNacimiento" 
                        {...register("fechaNacimiento")} 
                        disabled={isLoading || googleLoading}
                      />
                      {showErrors && errors.fechaNacimiento && <span className="error-message">{errors.fechaNacimiento.message}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="nacionalidad">Nacionalidad:</label>
                      <select 
                        id="nacionalidad" 
                        {...register("nacionalidad")}
                        defaultValue=""
                        disabled={isLoading || googleLoading}
                      >
                        <option value="" disabled>Selecciona tu nacionalidad</option>
                        <option value="mexicana">Mexicana</option>
                        <option value="estadounidense">Estadounidense</option>
                        <option value="colombiana">Colombiana</option>
                        <option value="española">Española</option>
                        <option value="argentina">Argentina</option>
                        <option value="otra">Otra</option>
                      </select>
                      {showErrors && errors.nacionalidad && <span className="error-message">{errors.nacionalidad.message}</span>}
                    </div>

                    <div className="form-group">
                      <label>Género:</label>
                      <select 
                        id="genero"
                        {...register("genero")}
                        defaultValue=""
                        disabled={isLoading || googleLoading}
                      >
                        <option value="" disabled>Selecciona tu género</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                        <option value="Prefiero no decirlo">Prefiero no decirlo</option>
                      </select>
                      {showErrors && errors.genero && <span className="error-message">{errors.genero.message}</span>}
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
                    ref={(e) => {
                      register("email").ref(e);
                      emailInputRef.current = e;
                      if (!isRegistering) firstInputRef.current = e;
                    }}
                    disabled={isLoading || googleLoading}
                  />
                  {showErrors && errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Contraseña:</label>
                  <div className="input-with-icon">
                    <input 
                      type={showPassword ? "text" : "password"}
                      id="password" 
                      {...register("password")}
                      placeholder="Contraseña"
                      disabled={isLoading || googleLoading}
                    />
                    <span 
                      className="toggle-visibility"
                      onClick={() => !isLoading && !googleLoading && setShowPassword(!showPassword)}
                      role="button"
                      aria-label="Mostrar u ocultar contraseña"
                    >
                      {showPassword ? "🙈" : "🙉"}
                    </span>
                  </div>
                  {showErrors && errors.password && <span className="error-message">{errors.password.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className="login-submit-btn"
                  disabled={isLoading || googleLoading}
                >
                  {isLoading ? "Procesando..." : (isRegistering ? "Registrarse" : "Iniciar Sesión")}
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
};