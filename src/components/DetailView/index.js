import React from 'react';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

import "./index.css";

function DetailView(props) {
  const { news } = props;
  const id = get(props, 'match.params.id', false);
  const article = news.find((article) => article.id === id);
  if (!id || isEmpty(article)) {
    return <div>
      Error! Go back to <Link to='/' >list page</Link>
    </div>
  }
  return <div className="article_wrapper">
    <div className="article_header_wrapper">
      <Link to="/">Back to list</Link>
      <a className="article_headline" href={article.url} target="_blank" rel="noopener noreferrer">
        {article.title}
      </a>
    </div>
    <img
      className="article_image"
      src={article.urlToImage}
      alt="article_image"
    />
    <p className="article_content">
      {article.content}
    </p>
  </div>;
};

const mapStateToProps = ({ news }) => ({ ...news });

export default connect(mapStateToProps)(DetailView);
