import React from 'react';
import { mount } from 'enzyme';

import ProfilePage from '../../../../src/components/profile/ProfilePage';

test('should test ProfilePage component', () => {
  const component = mount(<ProfilePage />);

  expect(component).toMatchSnapshot();
});
