import React from 'react';
import { shallow } from 'enzyme';

import Header from '../../../../../src/components/common/header/Header';

test('Header snapshot test', () => {
  const component = shallow(<Header />);
  expect(component).toMatchSnapshot();
});
