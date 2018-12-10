import Home from './components/home/HomePage';
import Login from './components/login/LoginPage';
import SignUpPage from './components/signup/SignUpPage';
import VerifyPage from './components/signup/VerifyPage';
import ArticlePage from './components/ArticlePage';
import AllArticlesPage from './components/allarticlespage/AllArticlesPage';
import NewArticle from './components/NewArticle';
import SearchPage from './components/SearchPage/SearchPage';
import WelcomePage from './components/welcome/WelcomePage';

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
    path: '/signup',
    component: SignUpPage,
    exact: false
  },
  {
    path: '/articles/:id',
    component: ArticlePage,
    exact: true
  },
  {
    path: '/articles/category/:categoryname',
    component: AllArticlesPage,
    exact: true
  },
  {
    path: '/new-article',
    component: NewArticle,
    exact: true
  },
  {
    path: '/search',
    component: SearchPage
  },
  {
    path: '/verifypage',
    component: VerifyPage,
    exact: true
  },
  {
    path: '/welcome',
    component: WelcomePage,
    exact: false
  }
];

export default routes;
