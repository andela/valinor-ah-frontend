import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from '../../../../src/App';
// eslint-disable-next-line import/no-duplicates
import LoginPage from '../../../../src/components/login/LoginPage';

import { LoginPage as UnConnectedLoginPage, mapDispatchToProps, mapStateToProps }
  // eslint-disable-next-line import/no-duplicates
  from '../../../../src/components/login/LoginPage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let props;
const setup = (status) => {
  props = {
    history: {
      push: jest.fn()
    },
    login: () => jest.fn(),
    url: 'donkey.com',
    status: {
      isLoggedIn: status
    },
    logout: () => jest.fn(),
    triggerFacebookAuthFailure: () => jest.fn(),
    retrieveUserFacebookData: () => jest.fn(() => { })
  };
  const wrapper = shallow(<UnConnectedLoginPage {...props} />);
  const mountedComponent = mount(
    <App>
      <Router>
        <LoginPage {...props} />
      </Router>
    </App>
  );
  return { props, wrapper, mountedComponent };
};
test('Login snapshot test', () => {
  const { wrapper } = setup(false);
  expect(wrapper).toMatchSnapshot();
});

test('Login second snapshot test', () => {
  const { wrapper } = setup(true);
  expect(wrapper).toMatchSnapshot();
});

test('Login mounted snapshot test', () => {
  const { mountedComponent } = setup(true);
  expect(mountedComponent).toMatchSnapshot();
});
test('Login mounted snapshot test', () => {
  const { mountedComponent } = setup(false);
  expect(mountedComponent).toMatchSnapshot();
});
test('test that login page doesnt crash', () => {
  const wrapper = shallow(<UnConnectedLoginPage {...props} />);
  expect(wrapper.exists()).toBe(true);
});

test('mapstate to props of homepage', () => {
  const state = {
    global: {
      isLoading: false,
      isLoggedIn: false,
      errors: []
    }
  };
  expect(mapStateToProps(state)).toEqual({
    status: {
      isLoading: false,
      isLoggedIn: false,
      errors: []
    }
  });
});
test('mapDispatchtoProps and state to props of homepage', () => {
  const dispatch = jest.fn();
  mapDispatchToProps(dispatch).triggerFacebookAuthFailure();
  expect(dispatch.mock.calls[0][0]).toEqual({
    payload: {
      isLoading: false,
      isLoggedIn: false,
      errors: [{
        error: 'facebook authentication failed'
      }]
    },
    type: 'FACEBOOK_AUTH_FAILURE'
  });
});

test('mapDispatchtoProps and state to props of loginpage', () => {
  const dispatch = jest.fn();
  mapDispatchToProps(dispatch).logout();
  expect(dispatch.mock.calls[0][0]).toEqual({
    payload: {
      isLoading: false,
      isLoggedIn: false,
      errors: [{
        error: 'your session expired'
      }]
    },
    type: 'FACEBOOK_AUTH_FAILURE'
  });
});

test('Testing behaviour of connected Login component under actions', () => {
  beforeEach(() => {
    const initialState = {
      global: {
        isLoading: false,
        isLoggedIn: false,
      }
    };
    const store = mockStore(initialState);
    const component = shallow(<LoginPage store={store} />);
    expect(component).toMatchSnapshot();
  });
});
