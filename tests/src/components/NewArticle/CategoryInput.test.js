import React from 'react';
import { shallow } from 'enzyme';

import CategoryInput from '../../../../src/components/NewArticle/CategoryInput';

const categoryOptions = [
  { id: 'Football', label: 'Football' },
  { id: 'Gaming', label: 'Gaming' },
  { id: 'Programming', label: 'Programming' },
];

test('CategoryInput snapshot test', () => {
  const component = shallow(<CategoryInput optionsArray={categoryOptions} />);
  expect(component).toMatchSnapshot();
});
