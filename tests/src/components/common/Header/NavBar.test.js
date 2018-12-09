import React from 'react';
import { shallow } from 'enzyme';
import { NavBar } from '../../../../../src/components/common/header/NavBar';

const setup = (status) => {
  const props = {
    status: {
      isLoggedIn: status
    }
  };

  const wrapper = shallow(<NavBar {...props} />);
  return {
    props,
    wrapper
  };
};
test('NavBar snapshot test', () => {
  expect(setup(false)).toMatchSnapshot();
});
