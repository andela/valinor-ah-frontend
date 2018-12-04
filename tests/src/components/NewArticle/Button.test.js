import React from 'react';
import { shallow } from 'enzyme';

import Button from '../../../../src/components/NewArticle/Button';

test('Button snapshot test', () => {
  const component = shallow(<Button label="Test" className="button test" />);
  expect(component).toMatchSnapshot();
});
