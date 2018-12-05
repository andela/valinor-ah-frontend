import React from 'react';
import { shallow } from 'enzyme';

import NavItems from '../../../../../src/components/common/header/NavItems';
import categories from '../../../../../mockdata/categories';

test('NavBar snapshot test', () => {
  const component = shallow(<NavItems categories={categories.categories} />);
  expect(component).toMatchSnapshot();
});
