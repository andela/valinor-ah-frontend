import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { SignUp, mapDispatchToProps, mapStateToProps } from '../../../../src/components/signup/SignUpPage';
import App from '../../../../src/App';

let setup;
describe('Signup components snapshot test', () => {
  setup = (status) => {
    const props = {
      history: {
        push: jest.fn()
      },
      login: () => jest.fn(),
      status: {
        isLoggedIn: status
      },
      logout: () => jest.fn(),
      triggerFacebookAuthFailure: () => jest.fn(),
      retrieveUserFacebookData: () => jest.fn()
    };

    const component = shallow(<SignUp {...props} />);
    const mountedComponent = mount(
      <App>
        <Router>
          <SignUp {...props} />
        </Router>
      </App>
    );
    return { props, component, mountedComponent };
  };

  test('Signup snapshot test', () => {
    const { component } = setup(false);
    expect(component).toMatchSnapshot();
  });
});

test('Signup second snapshot test', () => {
  const { component } = setup(true);
  expect(component).toMatchSnapshot();
});

test('Signup second snapshot test', () => {
  const { component } = setup(true);
  expect(component).toMatchSnapshot();
});

test('Signup second mounted snapshot test', () => {
  const { mountedComponent } = setup(true);
  expect(mountedComponent).toMatchSnapshot();
});

test('Signup behaviour', () => {
  const { component } = setup(true);
  component.instance().componentWillMount();
  expect(component.props().children).toMatchSnapshot();
});

test('Simulating facebook login/signup behaviour', () => {
  const { component } = setup(true);
  const instance = component.instance();
  instance.responseFacebook({
    name: 'donkey',
    email: 'donkey@fishes.com',
    picture: {
      data: {
        url: 'https://donkeyareeaatingapples.jpg'
      }
    }
  });
});

test('Simulating facebook login/signup behaviour', () => {
  const { component } = setup(true);
  const instance = component.instance();
  instance.componentWillMount = jest.fn();
  instance.componentWillMount();
});

test('testing mapstate to props of signup page', () => {
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
test('testing mapDispatchtoProps and state to props of signuppage', () => {
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

test('testing mapDispatchtoProps and state to props of signuppage', () => {
  const dispatch = jest.fn();
  mapDispatchToProps(dispatch).logout();
  expect(dispatch.mock.calls[0][0]).toEqual({
    payload: {
      isLoading: false,
      isLoggedIn: false,
      errors: [{
        error: 'your session has expired, please log in'
      }]
    },
    type: 'FACEBOOK_AUTH_FAILURE'
  });
});
