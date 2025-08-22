import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Footer from './components/Footer.jsx'
import { BrowserRouter } from 'react-router-dom';
import  AboutUs from './pages/AboutUs.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <AboutUs />
    <Footer/> 
  </BrowserRouter>
  </StrictMode>,
)
