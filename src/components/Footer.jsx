import '../styles/Footer.css';


export default function Footer() {
return (
    <footer className = "footer">
    <div className = "section">
        <div>
            <div className='logoContainer'>
                <img src="https://i.postimg.cc/44KR9BZZ/merckart.png" alt="Merckart Logo" className='logoImage' />
            </div>
            <div className='socialIcons'>
                <a href="https://www.meta.com" target="_blank" rel="noopener noreferrer" aria-label="Meta">
                    <img src="https://postimg.cc/Pp11zwHC" alt="Meta Logo" className='icons' />
                </a>
                 <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"  aria-label="Instagram">
                <img src= "https://i.postimg.cc/B6VN3TwB/insta.png" alt="Instagram Logo" className='icons' />
                </a>
                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer"  aria-label="TikTok">
                    <img src="https://i.postimg.cc/65nsHqym/tiktok.png" alt="Tik Tok Logo"className='icons' />
                    </a>
            </div>
   </div>

        <div className="linksContainer">
        <div className="linkItem">
            <h2>Ayuda</h2>
            <ul className="listsetting">
                <li>FAQ</li>
                <li>Terms & conditions</li>
                <li>Help center</li>
            </ul>
        </div>
         <div className="linkItem">
            <h2>Contacto</h2>
            <ul className="listsetting">
                <li>ChatBot</li>
                <li>E-mail</li>
            </ul>
        </div>
        <div className="linkItem">
            <h2>Cuenta</h2>
            <ul className="listsetting">
                <li>👨🏻‍💻 Login</li>
                <li>🛒 Carrito de compras</li>
                <li>❤️️ Favoritos</li>
            </ul>
        </div>
        </div>
    </div>

    <div className="copyright">
        <p>© 2025 MercArt. All rights reserved.</p>
        <p>Acerca de nosotros</p>

    </div> 
    </footer>
);
}
