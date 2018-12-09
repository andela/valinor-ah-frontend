import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../../../../../src/components/common/footer/Footer';

const setup = () => {
  const wrapper = shallow(<Footer />);
  return {
    wrapper
  };
};

test('Footer snapshot test', () => {
  const { wrapper } = setup();
  expect(wrapper).toMatchSnapshot();
});
