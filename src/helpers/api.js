import { get } from 'lodash';

const apiKey = '6af5795df2644312acab852bbde50bc6';

export const fetchNews = async (q, from, page = 1, pageSize = 10) => {
  try {
    const result = await fetch(`https://newsapi.org/v2/everything?q=${q}&from=${from}&sortBy=publishedAt&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`);
    const jsonResult = await result.json();
    return get(jsonResult, 'articles', []);
  } catch (err) {
    console.log('API Failed', err);
    return false;
  }
}
