import React from 'react';
import { shallow } from 'enzyme';

import AllArticlesPage from '../../../../src/components/allarticlespage/AllArticlesPage';

test('All articles snapshot test', () => {
  const component = shallow(<AllArticlesPage />);
  expect(component).toMatchSnapshot();
});
