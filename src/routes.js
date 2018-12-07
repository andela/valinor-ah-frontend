import { HomePage } from './components/home/HomePage';
import Login from './components/login/LoginPage';
import SignUp from './components/signup/SignUpPage';
import ArticlePage from './components/ArticlePage';

const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true
  },
  {
    path: '/login',
    component: Login,
    exact: true
  },
  {
    path: '/signup',
    component: SignUp,
    exact: false
  },
  {
    path: '/articles/:slug',
    component: ArticlePage,
    exact: true
  }
];

export default routes;
