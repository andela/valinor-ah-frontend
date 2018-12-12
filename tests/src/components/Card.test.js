import React from 'react';
import { shallow } from 'enzyme';

import {
  Card,
  CardList
} from '../../../src/components/Card';
import mockData from '../../../mockdata/articles';

const { articles } = mockData;

test('Card snapshot test', () => {
  const component = shallow(<Card title="test" category="test" body="test" backgroundImage="https://testing/" link="some/interesting/link" />);
  expect(component).toMatchSnapshot();
});

test('CardList snapshot test', () => {
  const component = shallow(<CardList article={articles} className="home-articles-cont" title="testing" />);
  const secondComponent = shallow(<CardList article={articles} className="testing" title="testing" />);
  expect(component).toMatchSnapshot();
  expect(secondComponent).toMatchSnapshot();
});

test('CardList snapshot test', () => {
  const component = shallow(<CardList article={articles} className="category-cont" title="testing" />);
  const secondComponent = shallow(<CardList article={articles} className="testing" title="testing" />);
  expect(component).toMatchSnapshot();
  expect(secondComponent).toMatchSnapshot();
});
