import moment from 'moment';
import uniquid from 'uniqid';

import { fetchNews } from 'helpers/api'
import { newsActionTypes } from '../actionTypes/news';
import { store } from '../index';

export const resetNews = (q) => {
  return async (dispatch) => {
    dispatch({ type: newsActionTypes.RESET_NEWS });
    const page = 1;
    dispatch({ type: newsActionTypes.FETCH_NEWS, payload: q });
    try {
      const from = moment().format('YYYY-MM-DD');
      const news = await fetchNews(q, from, page);
      dispatch({ type: newsActionTypes.FETCH_NEWS_SUCCESS, payload: news.map((article) => ({ ...article, id: uniquid() })) });
    } catch (err) {
      dispatch({ type: newsActionTypes.FETCH_NEWS_FAILURE });
    }
  }
}

export const loadNews = (q) => {
  return async (dispatch) => {
    const { news: { news } } = store.getState();
    const page = Math.ceil((news.length + 1)/10);
    dispatch({ type: newsActionTypes.FETCH_NEWS, payload: q });
    try {
      const from = moment().format('YYYY-MM-DD');
      const news = await fetchNews(q, from, page);
      dispatch({ type: newsActionTypes.FETCH_NEWS_SUCCESS, payload: news.map((article) => ({ ...article, id: uniquid() })) });
    } catch (err) {
      dispatch({ type: newsActionTypes.FETCH_NEWS_FAILURE });
    }
  }
};
