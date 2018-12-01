import React from 'react';
import { shallow } from 'enzyme';

import App from '../../src/App';

test('App snapshot test', () => {
  const component = shallow(<App />);
  // eslint-disable-next-line no-undef
  expect(component).toMatchSnapshot();
});
