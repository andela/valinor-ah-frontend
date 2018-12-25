import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import fetchMock from 'fetch-mock';
import DefaultLogin, { LoginPage } from '../../../../src/components/login/LoginPage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const profileObj = {
  name: 'Chris Akanmu',
  email: 'kkk@kkk.com',
  googleId: '7698761582',
  imageUrl: 'https://fake.com/'
};

const userFacebookInformation = {
  name: 'fishes donkey',
  email: 'doneky@apples.com',
  userID: '34343434343',
  picture: {
    data: {
      url: 'https://doneky.com'
    }
  }
};

describe('should test LoginPage components', () => {
  // eslint-disable-next-line max-len
  const firstComponent = mount(<Router><LoginPage isLoggedIn={false} request={jest.fn()} failure={jest.fn()} handleLogin={jest.fn()} /></Router>);
  // eslint-disable-next-line max-len
  const secondComponent = shallow(<LoginPage isLoggedIn request={jest.fn()} failure={jest.fn()} handleLogin={jest.fn()} />);

  expect(firstComponent).toMatchSnapshot();
  expect(secondComponent).toMatchSnapshot();

  const instance = secondComponent.instance();
  instance.responseGoogle({ profileObj });
  instance.responseFacebook({ userFacebookInformation });
  instance.handleSubmit({ preventDefault: jest.fn() });
  instance.handleInputChange({ preventDefault: jest.fn(), target: { name: 'Chris', value: 'Chris' } });
});

describe('Login snapshot test', () => {
  let component, store;
  beforeEach(() => {
    const initialState = {
      global: {
        isLoading: false,
        isLoggedIn: false
      }
    };
    store = mockStore(initialState);
    component = shallow(<DefaultLogin store={store} />);
  });

  it('certify that isLoggedIn is false', () => {
    expect(component.props().isLoggedIn).toBe(false);
  });

  it('should call faillure', () => {
    component.props().failure(['An error has occured']);
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        error: ['An error has occured'],
        isLoading: false,
        type: 'TRIGGER_FAILURE',
      }
    ]);
  });

  it('should call request', () => {
    component.props().request(true);
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        isLoading: true,
        type: 'TRIGGER_LOADING',
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
    fetchMock.post(`${process.env.API_BASE_URL}/auth/social`, { user: { token: '9768586757659865' } });
    component.props().handleLogin(body);
    const actions = store.getActions();
    expect(actions).toEqual([]);
  });
});
