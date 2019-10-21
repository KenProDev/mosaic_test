import { handleActions } from 'redux-actions'

import { newsActionTypes } from '../actionTypes/news';

const initialState = {
  keyword: 'bitcoin',
  news: [],
  currentState: '',
  error: false,
}

export default handleActions(
  {
    [newsActionTypes.RESET_NEWS]: (state, { type, payload }) => ({
      ...state,
      error: false,
      news: [],
      currentState: type,
    }),
    [newsActionTypes.FETCH_NEWS]: (state, { type, payload }) => ({
      ...state,
      keyword: payload,
      error: false,
      currentState: type,
    }),
    [newsActionTypes.FETCH_NEWS_SUCCESS]: (state, { type, payload }) => ({
      ...state,
      news: [...state.news, ...payload],
      error: false,
      currentState: type,
    }),
    [newsActionTypes.FETCH_NEWS_FAILURE]: (state, { type }) => ({
      ...state,
      error: true,
      currentState: type,
    }),
  },
  initialState
)
