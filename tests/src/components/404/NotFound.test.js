import React from 'react';
import { shallow } from 'enzyme';

import NotFound from '../../../../src/components/404/NotFound';

test('NotFound snapshot test', () => {
  const component = shallow(<NotFound />);
  expect(component).toMatchSnapshot();
});
