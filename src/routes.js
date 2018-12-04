import Home from './components/home/HomePage';
import Login from './components/login/LoginPage';
import NewArticle from './components/NewArticle';

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
    path: '/new-article',
    component: NewArticle,
    exact: true
  }
];

export default routes;
