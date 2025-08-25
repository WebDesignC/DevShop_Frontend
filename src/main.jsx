import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx';
import Footer from './components/Footer.jsx'
import Carrousel from './components/Carrousel.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Carrousel/>
      <App/> 
      <Footer/>
    </BrowserRouter>
  </StrictMode>,
)