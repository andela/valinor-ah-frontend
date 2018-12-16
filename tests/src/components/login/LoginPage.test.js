import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import fetchMock from 'fetch-mock';
import DefaultLogin, { unwrappedComponent as LoginPage } from '../../../../src/components/login/LoginPage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const profileObj = {
  name: 'Chris Akanmu',
  email: 'kkk@kkk.com',
  googleId: '7698761582',
  imageUrl: 'https://fake.com/'
};
test('should test LoginPage components', () => {
  // eslint-disable-next-line max-len
  const firstComponent = mount(<Router><LoginPage isLoggedIn={false} request={jest.fn()} failure={jest.fn()} handleLogin={jest.fn()} /></Router>);
  // eslint-disable-next-line max-len
  const secondComponent = shallow(<LoginPage isLoggedIn request={jest.fn()} failure={jest.fn()} handleLogin={jest.fn()} />);

  expect(firstComponent).toMatchSnapshot();
  expect(secondComponent).toMatchSnapshot();

  const instance = secondComponent.instance();
  instance.responseGoogle({ profileObj });
});


describe('Login snapshot test', () => {
  let component, store;
  beforeEach(() => {
    const initialState = {
      googleLoginReducer: {
        global: {
          isLoading: false,
          isLoggedIn: false
        }
      }
    };
    store = mockStore(initialState);
    component = shallow(<DefaultLogin store={store} />);
  });

  it('certify that isLoggedIn is false', () => {
    expect(component.props().isLoggedIn).toBe(false);
  });

  it('should call faillure', () => {
    component.props().failure();
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        isLoading: false,
        isLoggedIn: false,
        type: 'GOOGLE_LOGIN_FAILURE',
      }
    ]);
  });

  it('should call request', () => {
    component.props().request();
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        isLoading: true,
        isLoggedIn: false,
        type: 'GOOGLE_LOGIN_REQUEST',
      }
    ]);
  });

  it('should call handleLogin', () => {
    const body = {
      fullName: 'Christopher Akanmu',
      email: 'chris@yahoo.com',
      socialType: 'twitter',
      socialId: 8975854678,
      avatarUrl: 'https://yourimagehere.com'
    };
    fetchMock.post('https://valinor-ah-backend-staging.herokuapp.com/api/v1/auth/social', { user: { token: '9768586757659865' } });
    component.props().handleLogin(body);
    const actions = store.getActions();
    expect(actions).toEqual([]);
  });
});
