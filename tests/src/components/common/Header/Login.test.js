import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import DefaultLogin, { Login } from '../../../../../src/components/common/header/Login';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('TEST login component', () => {
  const component = shallow(<Login url={`${'https://fake'}`} logOutAction={jest.fn()} logOutUser={jest.fn()} handleSearchSubmit={jest.fn()} />);
  expect(component).toMatchSnapshot();
  const instance = component.instance();
  instance.logOutUser();
});

describe('', () => {
  let component, store;
  beforeEach(() => {
    const initialState = {
      global: {
        isLoading: false,
        isLoggedIn: false
      }
    };
    store = mockStore(initialState);
    component = shallow(<DefaultLogin store={store} url={`${'https://fake'}`} logOutAction={jest.fn()} handleSearchSubmit={jest.fn()} />);
  });

  it('certify that isLoggedIn is false', () => {
    expect(component.props().url).toBe('https://fake');
  });

  it('should call log out action', () => {
    component.props().logOutAction();
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        isLoggedIn: false,
        type: 'TRIGGER_LOGGEDIN',
      }
    ]);
  });

  it('should call log out user', () => {
    component.props().logOutAction();
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        isLoggedIn: false,
        type: 'TRIGGER_LOGGEDIN',
      }
    ]);
  });
});
