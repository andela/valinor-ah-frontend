import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import store from './store/store';
import NotFound from './components/404/NotFound';

import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Header />
        <Switch>
          {
            routes.map(route => (
              <Route
                exact={route.exact}
                path={route.path}
                key={route.path}
                component={route.component}
              />
            ))
          }
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Fragment>
    </Router>
  </Provider>
);

export default App;
