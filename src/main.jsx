import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Footer from './components/Footer.jsx'
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <Login/>
    <Footer/> 
  </BrowserRouter>
  </StrictMode>,
)
