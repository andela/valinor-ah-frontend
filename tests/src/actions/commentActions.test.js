import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { postComment } from '../../../src/actions/commentActions';
import { TRIGGER_LOADING } from '../../../src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
  fetchMock.restore();
});

const articleId = 1;
const commentPostCall = (commentResponse) => {
  fetchMock.postOnce(`${process.env.API_BASE_URL}/articles/${articleId}/comments`, {
    headers: { 'content-type': 'application/json' },
    body: commentResponse
  });
};

const articleFetchCall = (articleResponse) => {
  fetchMock.getOnce(`${process.env.API_BASE_URL}/articles/${articleId}`, {
    headers: { 'content-type': 'application/json' },
    body: articleResponse
  });
};

test('post comment action success', () => {
  const commentResponse = {
    status: 'success',
    comment: {}
  };
  commentPostCall(commentResponse);

  const articleResponse = {
    status: 'success',
    article: {}
  };
  articleFetchCall(articleResponse);

  const expectedActions = [
    {
      type: TRIGGER_LOADING,
      isLoading: true
    },
    {
      type: TRIGGER_LOADING,
      isLoading: true
    },
    {
      type: TRIGGER_LOADING,
      isLoading: false
    }
  ];

  const store = mockStore({});

  return store.dispatch(postComment('1', 'this is the body of comment'))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});

test('post comment action unauthorized', () => {
  const commentResponse = {
    status: 'unauthorized',
    comment: {}
  };
  commentPostCall(commentResponse);

  const expectedActions = [
    {
      type: TRIGGER_LOADING,
      isLoading: true
    },
    {
      type: TRIGGER_LOADING,
      isLoading: false
    }
  ];

  const store = mockStore({});

  return store.dispatch(postComment('1', 'this is the body of comment'))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});

test('post comment action success', () => {
  const commentResponse = {
    errors: {
      body: ['invalid body']
    }
  };
  commentPostCall(commentResponse);

  const expectedActions = [
    {
      type: TRIGGER_LOADING,
      isLoading: true
    },
    {
      type: TRIGGER_LOADING,
      isLoading: false
    }
  ];

  const store = mockStore({});

  return store.dispatch(postComment('1', 2))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});
