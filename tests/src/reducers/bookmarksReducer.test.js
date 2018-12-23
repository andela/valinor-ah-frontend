import bookmarksReducer from '../../../src/reducers/bookmarksReducer';
import {
  BOOKMARK_ARTICLE_FAILURE,
  BOOKMARK_ARTICLE_SUCCESS,
  FETCH_USER_BOOKMARKS_FAILURE,
  FETCH_USER_BOOKMARKS_SUCCESS
} from '../../../src/actions/actionTypes';
import bookmarkedArticlesMock from '../../../mockdata/singleArticle';

const initialState = {
  errors: {},
  bookmarkedArticles: [],
  bookmarkStatus: false
};

test('should return default state if no type is defined', () => {
  const expectedState = initialState;
  expect(bookmarksReducer(initialState, { type: 'SOME_UNKNNOWN_TYPE' }))
    .toEqual(expectedState);
});

test('should return expected state when exposed to the below action', () => {
  const expectedState = {
    errors: { typeError: 'failed to bookmark' },
    bookmarkedArticles: [],
    bookmarkStatus: false
  };
  const action = {
    type: BOOKMARK_ARTICLE_FAILURE,
    payload: { errors: { typeError: 'failed to bookmark' } }
  };
  expect(bookmarksReducer(initialState, action)).toEqual(expectedState);
});

test('should return expected state when exposed to the below action', () => {
  const expectedState = {
    errors: { typeError: 'failed to fetch' },
    bookmarkedArticles: [],
    bookmarkStatus: false
  };
  const action = {
    type: FETCH_USER_BOOKMARKS_FAILURE,
    payload: { errors: { typeError: 'failed to fetch' } }
  };
  expect(bookmarksReducer(initialState, action)).toEqual(expectedState);
});

test('should return expected state when exposed to the below action', () => {
  const expectedState = {
    errors: {},
    bookmarkedArticles: [],
    bookmarkStatus: true
  };
  const action = {
    type: BOOKMARK_ARTICLE_SUCCESS,
    payload: { bookmarkStatus: true }
  };
  expect(bookmarksReducer(initialState, action)).toEqual(expectedState);
});

test('should return expected state when exposed to the below action', () => {
  const expectedState = {
    errors: {},
    bookmarkedArticles: [bookmarkedArticlesMock],
    bookmarkStatus: false
  };
  const action = {
    type: FETCH_USER_BOOKMARKS_SUCCESS,
    payload: { bookmarkedArticles: [bookmarkedArticlesMock] }
  };
  expect(bookmarksReducer(initialState, action)).toEqual(expectedState);
});
