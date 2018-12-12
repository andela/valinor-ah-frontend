import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CardList } from '../Card';
import mockArticles from '../../../mockdata/articles';
import PopularPosts from './PopularPosts';
import { fetchCategory } from '../../actions/articleActions';

export const CardListArray = (props) => {
  const { articlesByCategory } = props;
  const categories = Object.entries(articlesByCategory);

  // check if the categories are still loading
  const fetchedCategories = categories.filter(categoryArray => (categoryArray[1].articles));
  const failedCategories = categories.filter(categoryArray => (categoryArray[1].error));
  const loading = categories.length > (fetchedCategories.length + failedCategories.length);
  if (loading) {
    return <i className="fas fa-spinner fa-3x fa-spin loading-icon" />;
  }

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
    return (
      <h5 key={category[0]}>
        <strong>{category[0]}</strong>
        <br />
        {category[1].error.message}
      </h5>
    );
  });
};

export class HomePageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: mockArticles
    };
  }

  componentWillMount() {
    const categoriesToFetch = ['sports', 'fashion', 'technology'];
    const { requestCategory } = this.props;
    categoriesToFetch.forEach((category) => {
      requestCategory(category);
    });
  }

  render() {
    const { articles } = this.state;
    const { articlesByCategory } = this.props;

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
              <PopularPosts articles={articles.articles} />
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

HomePageComponent.propTypes = {
  requestCategory: PropTypes.func.isRequired,
  articlesByCategory: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  articlesByCategory: state.articlesByCategory
});

const mapActionsToProps = {
  requestCategory: fetchCategory
};

export default connect(mapStateToProps, mapActionsToProps)(HomePageComponent);
