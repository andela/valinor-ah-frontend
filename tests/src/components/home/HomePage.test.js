import React from 'react';
import { shallow } from 'enzyme';
import mockData from '../../../../mockdata/articles';

import {
  PopularPosts,
  HomePage
} from '../../../../src/components/home/HomePage';

const { articles } = mockData;

test('PopularPosts snapshot test', () => {
  const component = shallow(<PopularPosts article={articles} />);
  expect(component).toMatchSnapshot();
});

test('Home snapshot test', () => {
  const component = shallow(<HomePage />);
  expect(component).toMatchSnapshot();
});
