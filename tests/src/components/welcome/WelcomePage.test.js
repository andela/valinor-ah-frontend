import React from 'react';
import { shallow } from 'enzyme';

import { Welcome } from '../../../../src/components/welcome/WelcomePage';

test('Welcome page snapshot test', () => {
  const component = shallow(<Welcome history={{ push: jest.fn() }} />);
  expect(component).toMatchSnapshot();
});
