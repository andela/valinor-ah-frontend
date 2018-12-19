import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { fetchCategoryTitles } from '../../../src/actions/categoryActions';
import { FETCH_CATEGORY_TITLES_SUCCESS, FETCH_CATEGORY_TITLES_FAILURE } from '../../../src/actions/actionTypes';
import { sampleCategoryOptions } from '../../../mockdata/samplebody';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
  fetchMock.restore();
});

test('request article category titles success action', () => {
  const categoryTitlesArray = sampleCategoryOptions;
  const mockResponse = {
    status: 'success',
    categories: categoryTitlesArray
  };

  fetchMock.getOnce(`${process.env.API_BASE_URL}/articles/categories`, {
    headers: { 'content-type': 'application/json' },
    body: mockResponse
  });

  const expectedActions = [
    {
      type: FETCH_CATEGORY_TITLES_SUCCESS,
      payload: { categoryTitlesArray }
    }
  ];

  const store = mockStore({});

  return store.dispatch(fetchCategoryTitles(categoryTitlesArray))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});

test('request article category failure action', () => {
  const mockResponse = {
    status: 'failure',
    errors: { message: 'not found' },
  };

  fetchMock.getOnce(`${process.env.API_BASE_URL}/articles/categories`, {
    headers: { 'content-type': 'application/json' },
    body: mockResponse
  });

  const expectedActions = [
    {
      type: FETCH_CATEGORY_TITLES_FAILURE,
      payload: { error: mockResponse.errors }
    },
  ];

  const store = mockStore({});

  return store.dispatch(fetchCategoryTitles())
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});
