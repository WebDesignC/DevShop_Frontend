import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Footer from './components/Footer.jsx'
import AboutUs from './pages/AboutUs.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AboutUs/>
    <Footer/> 
  </StrictMode>,
)
