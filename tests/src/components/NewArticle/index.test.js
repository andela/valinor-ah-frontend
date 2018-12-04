import React from 'react';
import { shallow } from 'enzyme';

import NewArticle from '../../../../src/components/NewArticle';

test('New Article snapshot test', () => {
  const component = shallow(<NewArticle />);
  expect(component).toMatchSnapshot();
});
