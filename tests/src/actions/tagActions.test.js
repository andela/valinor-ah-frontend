import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { fetchTagTitles } from '../../../src/actions/tagActions';
import { sampleTagOptions } from '../../../mockdata/samplebody';
import { FETCH_TAG_TITLES_SUCCESS, FETCH_TAG_TITLES_FAILURE } from '../../../src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
  fetchMock.restore();
});

test('request article tag titles success action', () => {
  const tagTitlesArray = sampleTagOptions;
  const mockResponse = {
    status: 'success',
    tags: {
      rows: tagTitlesArray
    }
  };

  fetchMock.getOnce(`${process.env.API_BASE_URL}/articles/tags`, {
    headers: { 'content-type': 'application/json' },
    body: mockResponse
  });

  const expectedActions = [
    {
      type: FETCH_TAG_TITLES_SUCCESS,
      payload: { tagTitlesArray }
    }
  ];

  const store = mockStore({});

  return store.dispatch(fetchTagTitles(tagTitlesArray))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});

test('request article category failure action', () => {
  const categoryName = 'sportest';
  const mockResponse = {
    errors: {
      message: 'category not found'
    }
  };

  fetchMock.getOnce(`${process.env.API_BASE_URL}/articles/tags`, {
    headers: { 'content-type': 'application/json' },
    body: mockResponse
  });

  const expectedActions = [
    {
      type: FETCH_TAG_TITLES_FAILURE,
      payload: { error: mockResponse.errors }
    },
  ];

  const store = mockStore({});

  return store.dispatch(fetchTagTitles(categoryName))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});
