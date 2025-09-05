import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './contexts/CartProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
const queryClient = new QueryClient();

// Reemplaza esto con tu Client ID real de Google
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "660980916488-701s8b2ipij8hkeke3ueufsta73du82c.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);