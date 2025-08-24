import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import '../styles/login.css';



const loginSchema = z.object({
    email: z.string().email({ message: "Correo inválido" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  });

const registerSchema = z.object({
  name: z.string().min(2, { message: "Nombre requerido" }),
  email: z.string().email({ message: "Correo inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const{
    register,
    handleSubmit,
    formState:{errors},
  } = useForm({ resolver: zodResolver(isRegistering? registerSchema:loginSchema),} );

  const onSubmit = (data) =>{
    console.log(isRegistering ? "Registro:" : "Login:", data)
  }
  

    return (
      <div className='master-container'>
        <div className="login-container">
            <section className="login-header">
                <h1>🌱 Bienvenido a MercArt</h1>
                <p>{isRegistering ? "Crea tu cuenta para comenzar a comprar." : "Inicia sesión para continuar con tu experiencia de compra."}</p>
                <div className='buton-select'>
                  <button className='boton' onClick={() => setIsRegistering(false)}>Login</button>
                  <button className='boton' onClick={() => setIsRegistering(true)}>Crear Cuenta</button>
                </div>
            </section>

            <div className='login-content'>
                <div className='login-form-container'>
                    <img
                        src="https://i.postimg.cc/44KR9BZZ/merckart.png"
                        alt="MercArt Logo"
                        className="login-logo"/>
                        
                    <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                        {isRegistering && (
                <div className="form-group">
                  <label htmlFor="name">Nombre:</label>
                  <input type="text" id="name" {...register("name")} placeholder="ej. Carlos Perez" />
                  {errors.name && <span className="error">{errors.name.message}</span>}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Correo Electrónico:</label>
                <input type="email" id="email" {...register("email")} placeholder="ejemplo@.com" />
                {errors.email && <span className="error">{errors.email.message}</span>}
              </div>


              <div className="form-group password-group">
                <label htmlFor="password">Contraseña:</label>
                <div className="input-with-icon">
                  <input type={showPassword ? "text" : "password"}
                  id="password" 
                  {...register("password")}
                    placeholder="Contraseña"
                    style={{ color: "#000" }} />
                    <span className="toggle-visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    role="button"
                    aria-label="Mostrar u ocultar contraseña">
                    {showPassword ? "🙈" : "🙉"}
                    </span>
                     {errors.password && <span className="error">{errors.password.message}</span>}
                </div>
              </div>

              <button type="submit" className="login-button">
                {isRegistering ? "Registrarse" : "Iniciar Sesión"}
              </button>
            </form>
          </div>

                <div className='login-video-container'>
                    <video src="https://videos.pexels.com/video-files/5585939/5585939-hd_1920_1080_25fps.mp4" className='Video'
                    autoPlay
                    loop
                    muted></video>
                </div>
            </div>
        </div>
      </div>
    );
    }

