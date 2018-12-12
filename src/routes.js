import HomePage from './components/home/HomePage';
import Login from './components/login/LoginPage';
import SignUp from './components/signup/SignUpPage';
import ArticlePage from './components/ArticlePage';
import AllArticlesPage from './components/allarticlespage/AllArticlesPage';

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
  },
  {
    path: '/articles/category/:categoryname',
    component: AllArticlesPage,
    exact: true
  }
];

export default routes;
