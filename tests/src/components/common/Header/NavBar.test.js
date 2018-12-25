import React from 'react';
import { shallow } from 'enzyme';

import NavBar from '../../../../../src/components/common/header/NavBar';

test('NavBar snapshot test', () => {
  const component = shallow(<NavBar handleSearchSubmit={jest.fn()} />);
  expect(component).toMatchSnapshot();
});
