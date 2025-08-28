
import Home from '../pages/HomePage';
import AboutUs from '../pages/AboutUsPage';
import Login from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProductsPage from '../pages/ProductsPage';


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
    path: '*',
    element: <NotFoundPage/>
  },
  {
    path: '/productos',
    element: <ProductsPage/>
  }


  // {
  //   path: '/help-center',
  //   element: <HelpCenter />
  // },
  // {
  //   path: '/faq',
  //   element: <FAQ />
  // },
  // {
  //   path: '/cart',
  //   element: <Cart />
  // },
  // {
  //   path: '/favorites',
  //   element: <Favorites />
  // },
  // {
  //   path: '/privacy',
  //   element: <PrivacyPolicy />
  // }
];

export default routes;