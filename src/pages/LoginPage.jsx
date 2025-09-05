import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {FaGoogle} from 'react-icons/fa';
import '../styles/login.css';

// Esquemas de validación
    const loginSchema = z.object({
      email: z.string().email({ message: "Correo inválido" }),
      password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
    });

    const registerSchema = z.object({
      name: z.string().min(2, { message: "Nombre requerido" }),
      apellido: z.string().min(2, { message: "Apellidos requeridos" }),
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
  const [isRegistering, setIsRegistering] = useState(false); //Registrarse
  const [showPassword, setShowPassword] = useState(false); //Mostrar contraseña
  const [showErrors, setShowErrors] = useState(false); //Mostrar errores
  const [isLoading, setIsLoading] = useState(false); 
  const [authError, setAuthError] = useState(""); //Errores de autenticación
  const [authSuccess, setAuthSuccess] = useState(""); //Éxito de autenticación
  const [googleLoading, setGoogleLoading] = useState(false); //Carga de Google
  
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


  const handleRegister = async (userData) => {

    const response = await fetch('https://mercartback.vercel.app/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;    
  };

  const handleLogin = async (credentials) => {

    const response = await fetch('https://mercartback.vercel.app/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  };

  const handleGoogleAuth = async (userInfo) => {
    const response = await fetch('https://mercartback.vercel.app/google-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo)
    });
    return await response.json();
    
    
  };

  // Función para manejar el envío del formulario
  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError("");
    setAuthSuccess("");
    
    try {
      if (isRegistering) {
        // Proceso de registro
        const newUser = await handleRegister(data);
        setAuthSuccess(`¡Cuenta creada exitosamente! Bienvenido/a ${newUser.name}`);
        
        // Cambiar a modo login después de registro exitoso
        setTimeout(() => {
          setIsRegistering(false);
          reset();
        }, 2000);
      } else {
        // Proceso de login
        const user = await handleLogin(data);
        setAuthSuccess(`¡Bienvenido de nuevo ${user.name}!`);
        
        // Guardar usuario (aquí guardarías el token JWT en lugar del objeto usuario)
        localStorage.setItem('authToken', 'token-aqui'); // REEMPLAZA CON TU TOKEN
      }
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para login con Google
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleLoading(true);
      setAuthError("");
      
      try {
        // Obtener información del usuario de Google
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        // Autenticar con tu backend
        const userData = await handleGoogleAuth(userInfo.data);
        setAuthSuccess(`¡Bienvenido ${userData.name}!`);
        
        // Guardar token de autenticación
        localStorage.setItem('authToken', 'token-google-aqui'); // REEMPLAZA CON TU TOKEN
      } catch (error) {
        setAuthError('Error al autenticar con Google. Intenta de nuevo.');
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => {
      setAuthError('Error al autenticar con Google. Intenta de nuevo.');
      setGoogleLoading(false);
    },
  });

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
              
              {/* Botón de Google */}
              <div className="google-auth-section">
                <button 
                  className="google-auth-btn"
                  onClick={() => loginWithGoogle()}
                  disabled={googleLoading || isLoading}
                  type="button"
                >
                  <FaGoogle />
                  {googleLoading ? 'Procesando...' : `Continuar con Google`}
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
                        {...register("name")} 
                        placeholder="ej. Carlos"
                        ref={(e) => {
                          register("name").ref(e);
                          firstInputRef.current = e;
                        }}
                        disabled={isLoading || googleLoading}
                      />
                      {showErrors && errors.name && <span className="error-message">{errors.name.message}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="apellido">Apellidos:</label>
                      <input 
                        type="text" 
                        id="apellido" 
                        {...register("apellido")} 
                        placeholder="ej. Perez García" 
                        disabled={isLoading || googleLoading}
                      />
                      {showErrors && errors.apellido && <span className="error-message">{errors.apellido.message}</span>}
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