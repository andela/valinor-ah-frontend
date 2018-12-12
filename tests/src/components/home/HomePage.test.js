import React from 'react';
import { shallow } from 'enzyme';
import mockData from '../../../../mockdata/articles';

import HomePage from '../../../../src/components/home/HomePage';
import PopularPosts from '../../../../src/components/home/PopularPosts';

const { articles } = mockData;

test('PopularPosts snapshot test', () => {
  const component = shallow(<PopularPosts article={articles} />);
  expect(component).toMatchSnapshot();
});

test('Home snapshot test', () => {
  const component = shallow(<HomePage />);
  expect(component).toMatchSnapshot();
});
