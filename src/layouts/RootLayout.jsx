import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/shared/Navbar'
import { Footer } from '../components/shared/Footer'
import BarraOfertas from '../components/shared/BarraOfertas'
import '../styles/RootLayout.css'

export const RootLayout = () => {
  return (
    <div className='root-layout'>
      <BarraOfertas />
      <Navbar />
      <main className='container'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};