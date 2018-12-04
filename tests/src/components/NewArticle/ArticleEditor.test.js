import React from 'react';
import { shallow } from 'enzyme';

import ArticleEditor from '../../../../src/components/NewArticle/ArticleEditor';

test('ArticleEditor snapshot test', () => {
  const component = shallow(<ArticleEditor />);
  expect(component).toMatchSnapshot();
});
