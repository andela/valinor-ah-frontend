import React from 'react';
import { shallow } from 'enzyme';

import {
  Card,
  CardList
} from '../../../src/components/Card';
import mockData from '../../../mockdata/articles';

const { articles } = mockData;

const setup = (limit) => {
  const props = {
    setPageLimit: jest.fn(),
    pageLimit: limit
  };
  const wrapper = shallow(<CardList article={articles} className="category-cont" title="testing" {...props} />);
  return { wrapper, props };
};

test('Card snapshot test', () => {
  const component = shallow(<Card title="test" category="test" body="test" backgroundImage="https://testing/" link={1} />);
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

test('CardList snapshot extended test', () => {
  const { wrapper } = setup(10);
  expect(wrapper).toMatchSnapshot();
});

test('CardList snapshot extended test', () => {
  const { wrapper } = setup(50);
  expect(wrapper).toMatchSnapshot();
});

test('CardList snapshot extended test', () => {
  const { wrapper } = setup(100);
  expect(wrapper).toMatchSnapshot();
});
