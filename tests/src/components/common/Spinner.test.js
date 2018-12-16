import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import DefaultSpinner, { Spinner } from '../../../../src/components/common/Spinner';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('SPINNER components snapshot test', () => {
  const initialState = {
    global: {
      isLoading: false,
      isLoggedIn: false
    }
  };
  const store = mockStore(initialState);
  const firstComponent = shallow(<DefaultSpinner store={store} isLoading={false} />);
  const secondComponent = shallow(<DefaultSpinner store={store} isLoading />);
  test('Signup snapshot test', () => {
    expect(firstComponent).toMatchSnapshot();
    expect(secondComponent).toMatchSnapshot();
  });
});

test('test unwrapped component', () => {
  const firstComponent = shallow(<Spinner isLoading={false} />);
  const secondComponent = shallow(<Spinner isLoading />);
  expect(firstComponent).toMatchSnapshot();
  expect(secondComponent).toMatchSnapshot();
});
