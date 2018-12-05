import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import store from './store/store';
import NotFound from './components/404/NotFound';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
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
      </Fragment>
    </Router>
  </Provider>
);

export default App;
