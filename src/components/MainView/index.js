import React from 'react';
import { connect } from 'react-redux';
import { takeRight } from 'lodash';

import { loadNews, resetNews } from 'stores/actions/news';
import { newsActionTypes } from 'stores/actionTypes/news';

import NewsList from './NewsList';

import './index.css';

class MainView extends React.Component {
  constructor(props) {
    super(props);
    const { news, keyword } = props;
    this.state = { news, keyword }
  }

  componentDidMount() {
    this.handleLoadMore();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentState, news: newData } = this.props;
    const { news } = this.state;
    if (prevProps.currentState === newsActionTypes.FETCH_NEWS && currentState === newsActionTypes.FETCH_NEWS_SUCCESS) {
      const newLength = newData.length - news.length;
      const newAry = takeRight(newData, newLength);
      this.setState({ news: [...news, ...newAry] });
    }
  }

  getLoadingState = () => {
    const { currentState } = this.props;
    const { news } = this.state;
    if (currentState === newsActionTypes.FETCH_NEWS && news.length === 0) {
      return 'loading';
    }
    if (currentState === newsActionTypes.FETCH_NEWS && news.length > 0) {
      return 'attaching';
    }
    if (currentState === newsActionTypes.FETCH_NEWS_FAILURE  && news.length === 0) {
      return 'fetching_error';
    }
    if (currentState === newsActionTypes.FETCH_NEWS_FAILURE  && news.length > 0) {
      return 'attaching_error';
    }
  }

  handleChangeOrder = (news) => {
    this.setState({ news });
  }

  handleLoadMore = () => {
    const { keyword } = this.state;
    this.props.loadNews(keyword);
  }

  handleKeywordChange = (e) => {
    const keyword = e.target.value;
    this.setState({ keyword });
  }

  handleSearch = () => {
    const { keyword } = this.state;
    this.setState({ news: [] });
    this.props.resetNews(keyword);
  }

  render() {
    const loadingState = this.getLoadingState();
    const { news, keyword } = this.state;
    return (
      <div className="main_wrapper">
        <div className="search_box">
          <input className="keyword_input" type="text" value={keyword} onChange={this.handleKeywordChange} />
          <div className="search_button" onClick={this.handleSearch} >Search</div>
        </div>
        {loadingState === 'loading' && (
          <div className="loading_state">Loading ...</div>
        )}
        {loadingState === 'fetching_error' && (
          <div className="loading_state">Unable to fetch articles</div>
        )}
        {loadingState !== 'loading' && loadingState !== 'fetching_error' && (
          <NewsList
            news={news}
            loadingState={loadingState}
            onChangeOrder={this.handleChangeOrder}
            onLoadMore={this.handleLoadMore}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ news }) => ({ ...news });

const mapDispatchToProps = { loadNews, resetNews };

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
