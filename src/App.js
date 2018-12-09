import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import routes from './routes';
import { store, persistor } from './store/store';
import NotFound from './components/404/NotFound';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import Spinner from './components/common/Spinner';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router>
            <Fragment>
              <Header />
              <Spinner />
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
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
