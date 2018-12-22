import React from 'react';
import { shallow } from 'enzyme';

import { Welcome } from '../../../../src/components/welcome/WelcomePage';

test('Welcome page snapshot test', () => {
  const history = {
    push: jest.fn(),
  };
  const component = shallow(<Welcome history={history} />);
  expect(component).toMatchSnapshot();
});
