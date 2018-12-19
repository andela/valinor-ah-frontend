import configureMockStore from 'redux-mock-store';

import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { postArticle } from '../../../src/actions/postArticleActions';
import { TRIGGER_LOADING, POST_ARTICLE_SUCCESS, POST_ARTICLE_FAILURE } from '../../../src/actions/actionTypes';
import { articleSample } from '../../../mockdata/samplebody';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

beforeEach(() => {
  localStorage.setItem('persist:root', JSON.stringify({ global: JSON.stringify({ isLoggedIn: true, isLoading: false }) }));
  localStorage.setItem('user', JSON.stringify({
    id: 8,
    fullName: 'Akanmu Christopher',
    email: 'akanmuchris@gmail.com',
    roleId: 3,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNihgfoutvuvbTQ0OTYwMTM1fQ.CcU4n0W_AjwUWU03qZ1deYp9NKpmYH-P-ADtFx1I9FE'
  }));
});

afterEach(() => {
  localStorage.clear();
  fetchMock.restore();
});

test('post article success action', () => {
  const mockResponse = {
    status: 'success',
    article: articleSample
  };

  fetchMock.postOnce(`${process.env.API_BASE_URL}/articles`, {
    headers: { 'content-type': 'application/json' },
    body: mockResponse
  });

  const expectedActions = [
    {
      type: TRIGGER_LOADING,
      isLoading: true
    },
    {
      type: POST_ARTICLE_SUCCESS,
      payload: articleSample
    },
    {
      type: TRIGGER_LOADING,
      isLoading: false
    }
  ];

  const store = mockStore({});
  const sampleArticleBody = {
    title: 'sample title',
    body: 'sample body'
  };

  const history = {
    push: jest.fn()
  };

  return store.dispatch(postArticle(sampleArticleBody, history))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});

test('post article category failure action- no token', () => {
  const mockResponse = {
    status: 'unauthorized',
    errors: {
      message: 'no token provided'
    }
  };

  fetchMock.postOnce(`${process.env.API_BASE_URL}/articles`, {
    headers: { 'content-type': 'application/json' },
    body: mockResponse
  });

  const expectedActions = [
    {
      type: TRIGGER_LOADING,
      isLoading: true
    },
    {
      type: POST_ARTICLE_FAILURE,
      payload: { errors: mockResponse.errors }
    },
    {
      type: TRIGGER_LOADING,
      isLoading: false
    }
  ];

  const store = mockStore({});

  return store.dispatch(postArticle())
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});
