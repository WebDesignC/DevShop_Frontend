
import Home from '../pages/HomePage';
import AboutUs from '../pages/AboutUsPage';
import Login from '../pages/LoginPage';


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