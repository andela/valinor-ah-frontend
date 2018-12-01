import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import routes from './routes';
import NotFound from './components/404/NotFound';

const App = () => (
  <Router>
    <div>
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
    </div>
  </Router>
);

export default App;
