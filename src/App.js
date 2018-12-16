import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

import routes from './routes';
import { persistor, store } from './store/store';
import NotFound from './components/404/NotFound';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import Spinner from './components/common/Spinner';
import checkUserStatus from './services/checkUserStatus';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    checkUserStatus();
  }

  render() {
    return (
      <PersistGate persistor={persistor}>
        <Provider store={store}>
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
              <ReduxToastr
                timeOut={null}
                newestOnTop
                preventDuplicates
                position="top-right"
                transitionIn="bounceInDown"
                transitionOut="bounceOutUp"
                progressBar
                closeOnToastrClick
              />
            </Fragment>
          </Router>
        </Provider>
      </PersistGate>
    );
  }
}

export default App;
