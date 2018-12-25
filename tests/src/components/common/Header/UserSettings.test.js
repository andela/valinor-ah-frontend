import React from 'react';
import { shallow } from 'enzyme';

import { UserSettings } from '../../../../../src/components/common/header/UserSettings';

test('UserSettings view for with no user logged in', () => {
  const component = shallow(<UserSettings handleSearchSubmit={jest.fn()} isLoggedIn />);
  expect(component).toMatchSnapshot();
});

test('UserSettings view for with user logged in', () => {
  const component = shallow(<UserSettings handleSearchSubmit={jest.fn()} isLoggedIn={false} />);
  expect(component).toMatchSnapshot();
});
