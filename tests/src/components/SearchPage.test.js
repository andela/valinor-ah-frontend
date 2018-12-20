import React from 'react';
import { shallow } from 'enzyme';

import SearchPage, { Filters } from '../../../src/components/SearchPage/SearchPage';

test('Test search page', () => {
  const firstComponent = shallow(<SearchPage />);
  const secondComponent = shallow(<Filters />);
  expect(firstComponent).toMatchSnapshot();
  expect(secondComponent).toMatchSnapshot();
});
