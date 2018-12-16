import HomePage from './components/home/HomePage';
import Login from './components/login/LoginPage';
import SignUpPage from './components/signup/SignUpPage';
import ArticlePage from './components/ArticlePage';
import AllArticlesPage from './components/allarticlespage/AllArticlesPage';
import NewArticle from './components/NewArticle';

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
    component: SignUpPage,
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
  },
  {
    path: '/new-article',
    component: NewArticle,
    exact: true
  }
];

export default routes;
