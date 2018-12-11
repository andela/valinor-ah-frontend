import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../../../../../src/components/common/footer/Footer';

test('Footer snapshot test', () => {
  const wrapper = shallow(<Footer />);
  expect(wrapper).toMatchSnapshot();
});
