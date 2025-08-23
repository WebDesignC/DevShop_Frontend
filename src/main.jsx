import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Footer from './components/Footer.jsx'
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>

    <Footer/> 
  </BrowserRouter>
  </StrictMode>,
)
