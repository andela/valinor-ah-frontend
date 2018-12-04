import React from 'react';
import { shallow } from 'enzyme';

import SaveOptions from '../../../../src/components/NewArticle/SaveOptions';

test('SaveOptions snapshot test', () => {
  const component = shallow(<SaveOptions />);
  expect(component).toMatchSnapshot();
});
