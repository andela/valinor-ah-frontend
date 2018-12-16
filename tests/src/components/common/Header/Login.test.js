import React from 'react';
import { shallow } from 'enzyme';

import Login from '../../../../../src/components/common/header/Login';

test('TEST login component', () => {
  const firstComponent = shallow(<Login url={`${'https://fake'}`} />);
  expect(firstComponent).toMatchSnapshot();
});
