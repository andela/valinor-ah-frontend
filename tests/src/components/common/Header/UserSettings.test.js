import React from 'react';
import { shallow } from 'enzyme';

import UserSettings from '../../../../../src/components/common/header/UserSettings';

test('UserSettings view for with no user logged in', () => {
  const isLoggedIn = false;
  const component = shallow(<UserSettings isLoggedIn={isLoggedIn} />);
  expect(component).toMatchSnapshot();
});

test('UserSettings view for with user logged in', () => {
  const isLoggedIn = true;
  const component = shallow(<UserSettings isLoggedIn={isLoggedIn} />);
  expect(component).toMatchSnapshot();
});
