import merckart from '../assets/merckart.png';
import meta from '../assets/meta.png';
import instagram from '../assets/insta.png';
import tiktok from '../assets/tiktok.png';

const styles = {
footer: {
    margin: '10px',
    borderRadius: '10px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#222',
    color: '#fff',
},
section: {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px',
    borderRadius: '5px',
    margin: '7.5px',
},
logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '85%',
    padding: '10px',
    borderRadius: '15px',
    margin: '7.5px',
},
logoImage: {
    width: '100%',
    height: '50%',
    borderRadius: '25px',
},
linksContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '75%',
    padding: '10px',
    borderRadius: '5px',
    margin: '7.5px',
    justifyContent: 'space-between',
},
linkItem: {
    padding: '10px',
    margin: '7.5px',
    flex: '1',
    textAlign: 'center',
},
copyright: {
    padding: '10px',
    margin: '7.5px',
    textAlign: 'center',
    fontSize: '0.9rem',
    opacity: 0.7,
},
listsetting: {
    listStyleType: 'none',
    padding: 0,
textAlign: 'left',
    margin: 0,},
icons: {
    width: '33px',
    height: '33px',
    margin: '0 5px',
},
};

export default function Footer() {
return (
    <footer style={styles.footer}>
    <div style={styles.section}>
        <div>
            <div style={styles.logoContainer}>
                <img src={merckart} alt="Merckart Logo" style={styles.logoImage} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', width: '100%' }}>
                <a href="https://www.meta.com" target="_blank" rel="noopener noreferrer" style={styles.iconLink} aria-label="Meta">
                    <img src={meta} alt="Meta Logo" style={styles.icons} />
                </a>
                 <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={styles.iconLink} aria-label="Instagram">
                <img src={instagram} alt="Instagram Logo" style={styles.icons} />
                </a>
                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" style={styles.iconLink} aria-label="TikTok">
                    <img src={tiktok} alt="Tik Tok Logo" style={styles.icons} />
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
