import React from 'react';
import { mount } from 'enzyme';
import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import VerifyPage from '../../../../src/components/signup/VerifyPage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

function setup() {
  const props = {
    VerifyUser: jest.fn(),
  };

  const enzymeWrapper = mount(<VerifyPage {...props} store={store} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('Component', () => {
  describe('VerifyPage', () => {
    const { enzymeWrapper } = setup();
    it('shallow test', () => {
      expect(enzymeWrapper).toMatchSnapshot();
    });
    it('should call registerUser', () => {
      fetchMock.get(`${process.env.API_BASE_URL}/users/verify`, { message: 'user verify successfully' });
      enzymeWrapper.props().VerifyUser('hgdg.dhjhd.dghd');
      const actions = store.getActions();
      expect(actions).toEqual([
        { isLoading: true, type: 'TRIGGER_LOADING' }
      ]);
    });
  });
});
