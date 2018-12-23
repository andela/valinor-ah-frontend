import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchBookmarkedFailure,
  fetchBookmarkedSuccess,
  fetchUserBookmarks,
  bookmarkArticle,
  bookmarkArticleFailure,
  bookmarkArticleSuccess,
  unbookmarkArticleSuccess
} from '../../../src/actions/bookmarkActions';
import mockData from '../../../mockdata/singleArticle';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
  fetchMock.restore();
});

test('fetchbookmarkedFailure action creator should create the below action', () => {
  expect(fetchBookmarkedFailure({ typeError: 'failed to fetch' })).toEqual({
    type: 'FETCH_USER_BOOKMARKS_FAILURE',
    payload: { errors: { typeError: 'failed to fetch' } }
  });
});

test('bookmarkArticleFailure action creator should create the below action', () => {
  expect(bookmarkArticleFailure({ typeError: 'failed to fetch' })).toEqual({
    type: 'BOOKMARK_ARTICLE_FAILURE',
    payload: { errors: { typeError: 'failed to fetch' } }
  });
});

test('bookmarkArticleSuccess action creator should create the below action', () => {
  expect(bookmarkArticleSuccess({ bookmarkStatus: true })).toEqual({
    type: 'BOOKMARK_ARTICLE_SUCCESS',
    payload: { bookmarkStatus: true }
  });
});

test('unbookmarkArticleSuccess action creator should create the below action', () => {
  expect(unbookmarkArticleSuccess({ bookmarkStatus: false })).toEqual({
    type: 'UNBOOKMARK_ARTICLE_SUCCESS',
    payload: { bookmarkStatus: false }
  });
});

test('fetchBookmarkSuccess action creator should create the below action', () => {
  expect(fetchBookmarkedSuccess(mockData)).toEqual({
    type: 'FETCH_USER_BOOKMARKS_SUCCESS',
    payload: mockData
  });
});

test('fetchBookmark async action should dispatch the following actions', () => {
  fetchMock.get(`${process.env.API_BASE_URL}/users/bookmarks`, {
    headers: { 'content-type': 'application/json' },
    body: { status: 'success', bookmarkedArticles: [mockData] }
  });
  const expectedActions = [
    {
      type: 'TRIGGER_LOADING',
      isLoading: true
    },
    {
      type: 'TRIGGER_LOADING',
      isLoading: false
    },
    {
      type: 'FETCH_USER_BOOKMARKS_SUCCESS',
      payload: { status: 'success', bookmarkedArticles: [mockData] }
    }
  ];
  const store = mockStore({ errors: {}, bookmarkedArticles: [], bookmarkStatus: false });

  return store.dispatch(fetchUserBookmarks())
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});

test('fetchBookmark async action should dispatch the following actions', () => {
  fetchMock.get(`${process.env.API_BASE_URL}/users/bookmarks`, {
    headers: { 'content-type': 'application/json' },
    body: { errors: 'failed to fetch' }
  });
  const expectedActions = [
    {
      type: 'TRIGGER_LOADING',
      isLoading: true
    },
    {
      type: 'TRIGGER_LOADING',
      isLoading: false
    },
    {
      type: 'FETCH_USER_BOOKMARKS_FAILURE',
      payload: { errors: 'failed to fetch' }
    }
  ];
  const store = mockStore({ errors: {}, bookmarkedArticles: [], bookmarkStatus: false });

  return store.dispatch(fetchUserBookmarks())
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});

test('bookmarkArticle async action should dispatch the following actions', () => {
  fetchMock.post(`${process.env.API_BASE_URL}/users/bookmarks/1`, {
    headers: { 'content-type': 'application/json' },
    body: { errors: 'failed to post' }
  });
  const expectedActions = [
    {
      type: 'BOOKMARK_ARTICLE_FAILURE',
      payload: { errors: 'failed to post' }
    }
  ];
  const store = mockStore({ errors: {}, bookmarkedArticles: [], bookmarkStatus: false });

  return store.dispatch(bookmarkArticle(1))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});

test('bookmarkArticle async action should dispatch the following actions', () => {
  fetchMock.post(`${process.env.API_BASE_URL}/users/bookmarks/1`, {
    headers: { 'content-type': 'application/json' },
    body: { bookmarkStatus: true }
  });
  const expectedActions = [
    {
      type: 'BOOKMARK_ARTICLE_SUCCESS',
      payload: { bookmarkStatus: true }
    }
  ];
  const store = mockStore({ errors: {}, bookmarkedArticles: [], bookmarkStatus: false });

  return store.dispatch(bookmarkArticle(1))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});

test('bookmarkArticle async action should dispatch the following actions', () => {
  fetchMock.post(`${process.env.API_BASE_URL}/users/bookmarks/1`, {
    headers: { 'content-type': 'application/json' },
    body: { bookmarkStatus: false }
  });
  const expectedActions = [
    {
      type: 'UNBOOKMARK_ARTICLE_SUCCESS',
      payload: { bookmarkStatus: false }
    }
  ];
  const store = mockStore({ errors: {}, bookmarkedArticles: [], bookmarkStatus: false });

  return store.dispatch(bookmarkArticle(1))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});
