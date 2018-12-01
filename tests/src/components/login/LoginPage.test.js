import React from 'react';
import { shallow } from 'enzyme';

import LoginPage from '../../../../src/components/login/LoginPage';

test('Login snapshot test', () => {
  const component = shallow(<LoginPage />);
  expect(component).toMatchSnapshot();
});
