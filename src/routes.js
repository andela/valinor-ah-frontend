import { HomePage } from './components/home/HomePage';
import Login from './components/login/LoginPage';

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
  }
];

export default routes;
