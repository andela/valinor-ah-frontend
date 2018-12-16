import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import PropTypes from 'prop-types';

import routes from './routes';
import { persistor } from './store/store';
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
    const { isLoading } = this.props;
    return (
      <PersistGate persistor={persistor}>
        <Router>
          <Fragment>
            <Header />
            <Spinner isLoading={isLoading} />
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
    );
  }
}

App.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({ isLoading: state.googleLoginReducer.global.isLoading });

export const unwrappedComponent = App;

export default connect(mapStateToProps)(App);
