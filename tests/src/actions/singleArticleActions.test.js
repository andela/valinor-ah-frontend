import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import fetchArticle from '../../../src/actions/singleArticleActions';
import { RECEIVE_ARTICLE_SUCCESS, TRIGGER_LOADING } from '../../../src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
  fetchMock.restore();
});

test('request article success action', () => {
  const articleId = 1;
  const mockArticle = {
    id: 1,
    artcleImage: 'https://bit.ly/2CaG1ce',
    title: 'My story at the beach',
    slug: 'My-story-at-the-beach-2324232323',
    description: 'This is my story at the beach',
    body: 'Once upon a time in Mexico.. there was ...',
    readTime: 3600,
    category: 'sports',
    rating: null,
    likes: 2,
    dislikes: 0,
    status: 'publish',
    commentsCount: 6,
    createdAt: '2018-12-18T19:24:32.889Z',
    updatedAt: '2018-12-18T19:24:32.889Z',
  };
  const mockResponse = {
    status: 'success',
    article: mockArticle
  };

  fetchMock.getOnce(`${process.env.API_BASE_URL}/articles/${articleId}`, {
    headers: { 'content-type': 'application/json' },
    body: mockResponse
  });

  const expectedActions = [
    {
      type: TRIGGER_LOADING,
      isLoading: true,
    },
    {
      type: RECEIVE_ARTICLE_SUCCESS,
      item: mockResponse
    },
    {
      type: TRIGGER_LOADING,
      isLoading: false,
    },
  ];

  const store = mockStore({ article: { item: {} } });

  return store.dispatch(fetchArticle(articleId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});
