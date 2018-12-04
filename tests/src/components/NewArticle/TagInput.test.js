import React from 'react';
import { shallow } from 'enzyme';

import TagInput from '../../../../src/components/NewArticle/TagInput';

const tagsArray = [
  { id: 'Andela', text: 'Andela' },
  { id: 'Bootcamp', text: 'Bootcamp' },
  { id: 'Cohort-41', text: 'Cohort-41' }
];

test('TagInput snapshot test', () => {
  const component = shallow(<TagInput suggestions={tagsArray} />);
  expect(component).toMatchSnapshot();
});
