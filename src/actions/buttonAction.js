import * as types from './actionTypes';

// actionCreators are here
export const toggleButtonOn = status => ({ type: types.ON_BUTTON, payload: { status } });

export const toggleButtonOff = status => ({ type: types.OFF_BUTTON, payload: { status } });
