import Home from '../pages/HomePage';
import AboutUs from '../pages/AboutPage';
import Login from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage'; // Añadido
import ProductPage from '../pages/ProductPage'

const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <AboutUs />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/cart',
    element: <CartPage /> // Añadido
  },
  {
    path: '/productos',
    element: <ProductsPage/>
  },
  {
    path: '/productos/:id',
    element: <ProductPage/> // Añadido para página individual de producto
  },
  {
    path: '*',
    element: <NotFoundPage/>
  }
];

export default routes;