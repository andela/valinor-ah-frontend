import React from 'react';
import { shallow } from 'enzyme';

import Login from '../../../../../src/components/common/header/Login';

test('Login snapshot test', () => {
  const props = {
    url: 'donkey.com'
  };
  const component = shallow(<Login {...props} />);
  expect(component).toMatchSnapshot();
});
