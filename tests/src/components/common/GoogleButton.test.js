import React from 'react';
import { shallow } from 'enzyme';

import GoogleButton from '../../../../src/components/common/GoogleButton';

test('should', () => {
  const component = shallow(<GoogleButton responseGoogle={jest.fn()} request={jest.fn()} text="Login in with google" />);
  expect(component).toMatchSnapshot();
});
