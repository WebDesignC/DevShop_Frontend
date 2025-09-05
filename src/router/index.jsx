import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootLayout } from "../layouts/RootLayout";
import {
    HomePage, ProductsPage, AboutPage, ProductPage,
    CartPage, NotFoundPage, LoginPage, RegisterPage,
    CategoryPage, SearchPage, PoliticaDePrivacidad, DataBreachAlertPage, FAQPage,HelpCenter
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
                element: <SearchPage />
            },
            {
                path: 'faq',
                element: <FAQPage />
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
            },
            {
                path:'products/category/:categorySlug',
                element: <CategoryPage/>
            },
            {
                path: 'privacy',
                element: <PoliticaDePrivacidad/>
            },
            {
                path: 'payment',
                element: <DataBreachAlertPage/>
            },
            {
                path: '/faq',
                element: <FAQPage />
            },
            {
                path: '/help-center',
                element: <HelpCenter />
            },
        ]
    },
]);
