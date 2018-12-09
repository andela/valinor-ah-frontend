import React from 'react';
import { shallow } from 'enzyme';
import mockData from '../../../../mockdata/articles';
import PopularPosts from '../../../../src/components/home/PopularPosts';
import {
  HomePage,
  mapDispatchToProps,
} from '../../../../src/components/home/HomePage';

const { articles } = mockData;

const setup = (status) => {
  const props = {
    status: {
      isLoggedIn: status
    },
    logout: () => jest.fn(),
    login: () => jest.fn(),
    location: {
      search: '?token=donkeydfdfdf'
    },
    history: {
      push: () => jest.fn(() => Promise.resolve(1))
    },
    triggerFacebookAuthSuccess: () => jest.fn()
  };

  const wrapper = shallow(<HomePage {...props} />);
  return {
    props,
    wrapper
  };
};

test('PopularPosts snapshot test', () => {
  const component = shallow(<PopularPosts article={articles} />);
  expect(component).toMatchSnapshot();
});

test('Home snapshot test', () => {
  const { wrapper } = setup(false);
  expect(wrapper).toMatchSnapshot();
});


test('ensures HomePage renders', () => {
  const { wrapper } = setup(false);
  expect(wrapper.exists()).toBe(true);
});

test('mapDispatchtoProps and state to props of homepage', () => {
  const dispatch = jest.fn();
  mapDispatchToProps(dispatch).login();
  expect(dispatch.mock.calls[0][0]).toEqual({
    payload: {
      isLoading: false,
      isLoggedIn: true
    },
    type: 'FACEBOOK_AUTH_SUCCESS'
  });
});

test('mapDispatchtoProps and state to props of homepage', () => {
  const dispatch = jest.fn();
  mapDispatchToProps(dispatch).logout();
  expect(dispatch.mock.calls[0][0]).toEqual({
    payload: {
      isLoading: false,
      isLoggedIn: false,
      errors: [{
        error: 'your session expired, please login'
      }]
    },
    type: 'FACEBOOK_AUTH_FAILURE'
  });
});
