import Home from './components/home/HomePage';
import Login from './components/login/LoginPage';
import AllArticles from './components/AllArticles';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/login',
    component: Login,
    exact: true
  },
  {
    path: '/articles',
    component: AllArticles,
    exact: false
  }
];

export default routes;
