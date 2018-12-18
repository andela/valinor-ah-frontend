import React from 'react';
import { shallow } from 'enzyme';
import { AllArticlesPage, mapDispatchToProps } from '../../../../src/components/allarticlespage/AllArticlesPage';

const setup = (categoryType, firstArray, secondArray) => {
  const props = {
    getArticles: jest.fn(),
    match: {
      params: {
        categoryName: categoryType
      }
    },
    history: {
      push: () => jest.fn()
    },
    articles: {
      sports: {
        articles: firstArray,
        currentPage: 1,
        pages: 2
      },
      fashion: {
        articles: secondArray,
        currentPage: 1,
        pages: 2
      }
    },
    popularPosts: {
      articles: []
    }
  };

  const wrapper = shallow(<AllArticlesPage {...props} />);
  return { props, wrapper };
};

test('should render all articles page', () => {
  const body = {
    id: 5,
    articleImage: 'https://bit.ly/2CaG1ce',
    title: 'Jambolani',
    slug: 'south-africa-201a',
    description: 'Jambolani is the fifa ball',
    body: 'Jambolani is the fifa ball used in south africa 2010 world cup',
    readTime: 3600,
    category: 'sports',
    rating: null,
    likes: 1,
    dislikes: 1,
    status: 'publish',
    commentsCount: 0,
    createdAt: '2018-12-21T03:23:58.488Z',
    updatedAt: '2018-12-21T03:23:58.488Z',
    author: {
      id: 2,
      fullName: 'John Mike',
      avatarUrl: 'https://bit.ly/2UT01ax',
      roleId: 3,
      email: 'johnmike@andela.com',
      bio: null,
      followers: 0,
      following: 0
    }
  };
  const { wrapper } = setup('sports', [body], '');
  expect(wrapper).toMatchSnapshot();
});


test('should render all articles page', () => {
  const { wrapper } = setup('sports', '', '');
  expect(wrapper).toMatchSnapshot();
});

test('test all articles page default state', () => {
  const { wrapper } = setup('sports', '', '');
  expect(wrapper.state('pageLimit')).toBe(10);
});

test('test all articles page methods', () => {
  const { wrapper, props } = setup('sports', [], []);
  const { getArticles } = props;
  const wrapperInstance = wrapper.instance();
  wrapperInstance.componentDidMount();
  expect(getArticles).toHaveBeenCalled();
});

test('test all articles page fetch articleFromClicks methods', () => {
  const { wrapper, props } = setup('sports', [], []);
  const { getArticles } = props;
  const wrapperInstance = wrapper.instance();
  wrapperInstance.fetchArticlesFromClicks();
  expect(getArticles).toHaveBeenCalled();
});

test('test all articles page fetch articleFromClicks methods', () => {
  const { wrapper, props } = setup('sports', [], []);
  const { getArticles } = props;
  const wrapperInstance = wrapper.instance();
  wrapperInstance.custom(20);
  expect(getArticles).toHaveBeenCalled();
});

test('test all articles page setPageLimit methods', () => {
  const { wrapper, props } = setup('sports', [], []);
  const { getArticles } = props;
  const event = {
    target: {
      value: 50,
      attributes: [{ value: 100 }, { value: 50 }, { value: 10 }, { value: 0 }]
    },
    preventDefault: jest.fn()
  };
  const wrapperInstance = wrapper.instance();
  wrapperInstance.setPageLimit(event);
  expect(event.preventDefault).toHaveBeenCalled();
  expect(wrapper.state('pageLimit')).toBe(100);
  expect(getArticles).toHaveBeenCalled();
});

test('mapDispatchToProps tests on all articles page', () => {
  const dispatch = jest.fn();
  mapDispatchToProps(dispatch).getArticles('sports', 1, 20);
  expect(dispatch.mock.calls.length).toBe(1);
});
