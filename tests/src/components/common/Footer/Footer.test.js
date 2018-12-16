import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../../../../../src/components/common/footer/Footer';

test('NavBar snapshot test', () => {
  const component = shallow(<Footer />);
  expect(component).toMatchSnapshot();
});
