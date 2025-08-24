import '../styles/Login.css';

export default function Login() {
    return (
        <div className="login-container">
            <section className="login-header">
                <h1>🌱 Bienvenido a MercArt</h1>
                <p>Inicia sesión para continuar con tu experiencia de compra.</p>
            </section> {/*Mensaje de bienvenida*/}

            <div className='login-content'>
                <div className='login-form-container'>
                    <img
                        src="https://i.postimg.cc/44KR9BZZ/merckart.png"
                        alt="MercArt Logo"
                        className="login-logo"/>
                    <form className='login-form'>
                        <div className="form-group">
                                <label htmlFor="email">Correo Electrónico:</label>
                                <input type="email" id="email" name="email" required />
                        </div>
                                
                        <div className="form-group">
                                <label htmlFor="password">Contraseña:</label>
                                <input type="password" id="password" name="password" required />
                        </div>
                                
                            <button type="submit" className="login-button">Iniciar Sesión</button>
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
    );
    }

