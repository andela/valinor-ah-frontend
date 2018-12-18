import configureMockStore from 'redux-mock-store';

import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { fetchCategory, fetchPopularPosts } from '../../../src/actions/articleActions';
import {
  TRIGGER_LOADING,
  FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_FAILURE,
  FETCH_POPULAR_SUCCESS, FETCH_POPULAR_FAILURE
} from '../../../src/actions/actionTypes';

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
      type: TRIGGER_LOADING,
      isLoading: true
    },
    {
      type: FETCH_CATEGORY_SUCCESS,
      categoryName,
      payload: mockResponse
    },
    {
      type: TRIGGER_LOADING,
      isLoading: false
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
      type: TRIGGER_LOADING,
      isLoading: true
    },
    {
      type: FETCH_CATEGORY_FAILURE,
      categoryName,
      payload: { error: mockResponse.errors }
    },
    {
      type: TRIGGER_LOADING,
      isLoading: false
    }
  ];

  const store = mockStore({});

  return store.dispatch(fetchCategory(categoryName))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});

test('request popular posts action success', () => {
  const mockResponse = {
    articles: [
      { title: 'test title 1' },
      { title: 'test title 2' }
    ]
  };

  fetchMock.getOnce(`${process.env.API_BASE_URL}/articles/popular`, {
    headers: { 'content-type': 'application/json' },
    body: mockResponse
  });

  const expectedActions = [
    {
      type: TRIGGER_LOADING,
      isLoading: true
    },
    {
      type: FETCH_POPULAR_SUCCESS,
      payload: mockResponse
    },
    {
      type: TRIGGER_LOADING,
      isLoading: false
    }
  ];

  const store = mockStore({});

  return store.dispatch(fetchPopularPosts())
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});

test('request popular posts action failure', () => {
  const mockResponse = {
    errors: []
  };

  fetchMock.getOnce(`${process.env.API_BASE_URL}/articles/popular`, {
    headers: { 'content-type': 'application/json' },
    body: mockResponse
  });

  const expectedActions = [
    {
      type: TRIGGER_LOADING,
      isLoading: true
    },
    {
      type: FETCH_POPULAR_FAILURE,
      payload: {
        error: []
      }
    },
    {
      type: TRIGGER_LOADING,
      isLoading: false
    }
  ];

  const store = mockStore({});

  return store.dispatch(fetchPopularPosts())
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});
