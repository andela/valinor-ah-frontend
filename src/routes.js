import { HomePage } from './components/home/HomePage';
import Login from './components/login/LoginPage';
import SignUp from './components/signup/SignUpPage';

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
];

export default routes;
