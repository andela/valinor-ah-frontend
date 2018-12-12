import configureMockStore from 'redux-mock-store';

import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { fetchCategory } from '../../../src/actions/articleActions';
import { FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_FAILURE } from '../../../src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
  fetchMock.restore();
});

test('request article category success action', () => {
  const categoryName = 'sports';
  const mockResponse = {
    articles: [
      { title: 'test title 1' },
      { title: 'test title 2' }
    ]
  };

  fetchMock.getOnce(`${process.env.API_BASE_URL}/articles/category/${categoryName}`, {
    headers: { 'content-type': 'application/json' },
    body: mockResponse
  });

  const expectedActions = [
    {
      type: FETCH_CATEGORY_REQUEST,
      categoryName
    },
    {
      type: FETCH_CATEGORY_SUCCESS,
      categoryName,
      payload: mockResponse
    }
  ];

  const store = mockStore({});

  return store.dispatch(fetchCategory(categoryName))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});

test('request article category failure action', () => {
  const categoryName = 'sportest';
  const mockResponse = {
    errors: 'category not found',
  };

  fetchMock.getOnce(`${process.env.API_BASE_URL}/articles/category/${categoryName}`, {
    headers: { 'content-type': 'application/json' },
    body: mockResponse
  });

  const expectedActions = [
    {
      type: FETCH_CATEGORY_REQUEST,
      categoryName
    },
    {
      type: FETCH_CATEGORY_FAILURE,
      categoryName,
      payload: { error: mockResponse.errors }
    }
  ];

  const store = mockStore({});

  return store.dispatch(fetchCategory(categoryName))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});
