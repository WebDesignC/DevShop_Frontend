import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout'
import {
    HomePage, ProductsPage, AboutPage, ProductPage,
    CartPage, NotFoundPage, LoginPage, RegisterPage
} from '../pages'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'productos',
                element: <ProductsPage />,
            },
            {
                path: 'productos/:id',
                element: <ProductPage />
            },
            {
                path: 'nosotros',
                element: <AboutPage />
            },
            {
                path: 'cart',
                element: <CartPage />
            },
            {
                path: 'search',
                element: <NotFoundPage />
            },
            {
                path: '*',
                element: <NotFoundPage />
            },
            {
                path: 'login',
                element: <LoginPage/>
            },
            {
                path: 'register',
                element: <RegisterPage/>
            }
        ]
    },
]);