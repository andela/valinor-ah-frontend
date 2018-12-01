import React from 'react';
import { shallow } from 'enzyme';

import NavBar from '../../../../src/components/navigation/NavBar';

test('NavBar snapshot test', () => {
  const component = shallow(<NavBar />);
  expect(component).toMatchSnapshot();
});
