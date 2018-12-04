import React from 'react';
import { shallow } from 'enzyme';

import InputBox from '../../../../src/components/NewArticle/InputBox';

test('InputBox snapshot test', () => {
  const component = shallow(<InputBox
      label="Test"
      placeholder="test placholder"
      className="input test" />);
  expect(component).toMatchSnapshot();
});
