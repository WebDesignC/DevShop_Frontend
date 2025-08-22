import './Footer.css';


export default function Footer() {
return (
    <footer className="footer">}>
    <div style={styles.section}>
        <div>
            <div style={styles.logoContainer}>
                <img src="https://i.postimg.cc/44KR9BZZ/merckart.png" alt="Merckart Logo" style={styles.logoImage} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', width: '100%' }}>
                <a href="https://www.meta.com" target="_blank" rel="noopener noreferrer" style={styles.iconLink} aria-label="Meta">
                    <img src="https://postimg.cc/Pp11zwHC" alt="Meta Logo" style={styles.icons} />
                </a>
                 <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={styles.iconLink} aria-label="Instagram">
                <img src= "https://i.postimg.cc/B6VN3TwB/insta.png" alt="Instagram Logo" style={styles.icons} />
                </a>
                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" style={styles.iconLink} aria-label="TikTok">
                    <img src="https://i.postimg.cc/65nsHqym/tiktok.png" alt="Tik Tok Logo" style={styles.icons} />
                    </a>
            </div>
   </div>

        <div style={styles.linksContainer}>
        <div style={styles.linkItem}>
            <h3>Help</h3>
            <ul style={styles.listsetting}>
                <li>FAQ</li>
                <li>Terms & conditions</li>
                <li>Help center</li>
            </ul>
        </div>
        <div style={styles.linkItem}>
            <h3>Contact</h3>
            <ul style={styles.listsetting}>
                <li>ChatBot</li>
                <li>E-mail</li>
            </ul>
        </div>
        <div style={styles.linkItem}>
            <h3>Account</h3>
            <ul style={styles.listsetting}>
                <li>👨🏻‍💻 Login</li>
                <li>🛒 Carrito de compras</li>
                <li>❤️️ Favoritos</li>
            </ul>
        </div>
        </div>
    </div>

    <div style={styles.copyright}>
        <p>© 2025 MercArt. All rights reserved.</p>
        <p>Acerca de nosotros</p>

    </div> 
    </footer>
);
}
