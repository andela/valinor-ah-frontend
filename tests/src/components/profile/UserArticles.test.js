import React from 'react';
import { mount } from 'enzyme';

import UserArticles from '../../../../src/components/profile/UserArticles';
import user from '../../../../mockdata/userProfile';

test('should test ProfilePage component', () => {
  const firstName = 'D\'jango';
  const { articles } = user.userProfile;
  const component = mount(<UserArticles articles={articles} firstName={firstName} />);

  expect(component).toMatchSnapshot();
});
