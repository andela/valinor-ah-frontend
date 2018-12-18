import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CardList } from '../Card';
import PopularPosts from './PopularPosts';
import { fetchCategory, fetchPopularPosts } from '../../actions/articleActions';

export const CardListArray = (props) => {
  const { articlesByCategory } = props;
  const categories = Object.entries(articlesByCategory);

  return categories.map((category) => {
    if (category[1].articles) {
      return (
        <CardList
        key={category[0]}
        className="home-articles-cont"
        title={category[0]}
        article={category[1].articles.slice(0, 6)} />
      );
    }
    return null;
  });
};

export class HomePage extends Component {
  componentWillMount() {
    const { requestCategory, requestPopularPosts } = this.props;

    // fetch the required categories
    const categoriesToFetch = ['sports', 'fashion', 'technology'];
    categoriesToFetch.forEach((category) => {
      requestCategory(category);
    });

    // fetch the popular posts
    requestPopularPosts();
  }

  render() {
    const { articlesByCategory, popularPosts } = this.props;

    return (
      <Fragment>
        <div className="site-content">
          <div className="site-intro">
            <h1>Authors Haven</h1>
            <p>A Social platform for the creative at heart.</p>
          </div>
          <div className="main">
            <div id="primary">
              {<CardListArray articlesByCategory={articlesByCategory} />}
            </div>
            <div id="secondary">
              <PopularPosts articles={popularPosts.articles} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

CardListArray.propTypes = {
  articlesByCategory: PropTypes.object.isRequired
};

HomePage.propTypes = {
  requestCategory: PropTypes.func.isRequired,
  requestPopularPosts: PropTypes.func.isRequired,
  articlesByCategory: PropTypes.object.isRequired,
  popularPosts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  articlesByCategory: state.articlesByCategory,
  popularPosts: state.popularArticles
});

const mapActionsToProps = {
  requestCategory: fetchCategory,
  requestPopularPosts: fetchPopularPosts,
};

export default connect(mapStateToProps, mapActionsToProps)(HomePage);
