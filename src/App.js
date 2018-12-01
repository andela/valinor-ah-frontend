import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import routes from './routes';

const App = () => (
  <Router>
    <div>
      {
      // eslint-disable-next-line max-len
        routes.map(route => (<Route exact path={route.path} key={route.path} component={route.component} />))
      }
    </div>
  </Router>
);

export default App;
