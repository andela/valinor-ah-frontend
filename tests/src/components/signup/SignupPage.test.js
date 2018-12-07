import React from 'react';
import { shallow } from 'enzyme';

import SignUpPage from '../../../../src/components/signup/SignUpPage';

const component = shallow(<SignUpPage />);

describe('Signup components snapshot test', () => {
  test('Signup snapshot test', () => {
    expect(component).toMatchSnapshot();
  });
});
