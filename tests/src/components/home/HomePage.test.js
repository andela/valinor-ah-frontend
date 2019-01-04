
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import mockData from '../../../../mockdata/articles';
import DefaultHomePage, { HomePage, CardListArray } from '../../../../src/components/home/HomePage';
import PopularPosts from '../../../../src/components/home/PopularPosts';

const { articles } = mockData;

test('PopularPosts snapshot test', () => {
  const noArticleComponent = shallow(<PopularPosts articles={[]} />);
  expect(noArticleComponent).toMatchSnapshot();
  const component = shallow(<PopularPosts articles={articles} />);
  expect(component).toMatchSnapshot();
});

// mock fetched articles by category
const mockArticlesByCategory = {
  sports: { articles },
  football: { articles }
};

test('CardListArray with valid articles snapshot test', () => {
  const cardListArray = shallow(<CardListArray articlesByCategory={mockArticlesByCategory} />);
  expect(cardListArray).toMatchSnapshot();
});

test('CardListArray with failed articles snapshot test', () => {
  // mock state with failed article category
  const failArticlesByCategory = {
    sportsss: { error: 'category not found' },
    footballll: { error: 'category not found' }
  };
  const cardListArray = shallow(<CardListArray articlesByCategory={failArticlesByCategory} />);
  expect(cardListArray).toMatchSnapshot();
});

test('CardListArray with loading articles snapshot test', () => {
  // mock state with loading categories
  const loadingArticlesByCategory = {
    sports: {},
    football: {}
  };
  const cardListArray = shallow(<CardListArray articlesByCategory={loadingArticlesByCategory} />);
  expect(cardListArray).toMatchSnapshot();
});

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    requestCategory: jest.fn(),
    requestPopularPosts: jest.fn(),
    articlesByCategory: mockArticlesByCategory,
    popularPosts: { articles }
  };

  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore({
    articlesByCategory: mockArticlesByCategory,
    popularArticles: { articles }
  });

  const homePageWrapper = shallow(<HomePage {...props} />);
  const connectedWrapper = shallow(<DefaultHomePage {...props} store={store} />);

  return {
    props,
    homePageWrapper,
    connectedWrapper
  };
}

test('homepage should render self and subcomponents', () => {
  const { homePageWrapper } = setup();
  expect(homePageWrapper.find('div').first().hasClass('site-content')).toBe(true);

  const cardListArrayProps = homePageWrapper.find('CardListArray').props();
  expect(cardListArrayProps.articlesByCategory).toBe(mockArticlesByCategory);
});
