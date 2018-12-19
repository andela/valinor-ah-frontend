import { toastr } from 'react-redux-toastr';
import {
  FETCH_TAG_TITLES_SUCCESS,
  FETCH_TAG_TITLES_FAILURE,
} from './actionTypes';

import { globalFailure } from './globalActions';

const requestTagTitlesSuccess = tagTitlesArray => ({
  type: FETCH_TAG_TITLES_SUCCESS,
  payload: { tagTitlesArray }
});

const requestTagTitlesFailure = error => ({
  type: FETCH_TAG_TITLES_FAILURE,
  payload: { error }
});

export const fetchTagTitles = () => dispatch => fetch(`${process.env.API_BASE_URL}/articles/tags`)
  .then(
    res => res.json(),
    error => dispatch(globalFailure(error))
  )
  .then((tagsResponse) => {
    if (tagsResponse.status === 'success') {
      return dispatch(requestTagTitlesSuccess(tagsResponse.tags.rows));
    }
    dispatch(requestTagTitlesFailure(tagsResponse.errors));
    toastr.error(`Failed to fetch categories... Error: ${tagsResponse.errors.message}`);
  });

export const dummyExport = null;
