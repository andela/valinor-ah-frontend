import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CardList } from '../Card';
import { formatDate } from '../../utils';
import Header from '../common/Header';
import mockArticles from '../../../mockdata/articles';

export const PopularPosts = (props) => {
  const {
    article
  } = props;
  return (
    <div className="sidebar">
      <h1>Popular Posts</h1>
      <ul>
        <li>
          { article.slice(0, 6).map((currentArticle, index) => (
            <div className="pop-post" key={`post${String(index)}`}>
              <p><NavLink to="/articles/1">{currentArticle.title}</NavLink></p>
              <span>
                {`${currentArticle.author.fullName} in ${currentArticle.category} on ${formatDate(currentArticle.createdAt)}`}
              </span>
            </div>
          )) }
        </li>
      </ul>
    </div>
  );
};

export class HomePage extends Component {
  state = {
    articles: mockArticles
  };

  render() {
    const { articles } = this.state;
    return (
      <Fragment>
        <Header />
        <div className="site-content">
          <div className="site-intro">
            <h1>Authors Haven</h1>
            <p>A Social platform for the creative at heart.</p>
          </div>
          <div className="main">
            <div id="primary">
              <CardList className="home-articles-cont" title="Sports" article={articles.articles.slice(0, 6)} />
              <CardList className="home-articles-cont" title="Computer Science" article={articles.articles.slice(0, 6)} />
              <CardList className="home-articles-cont" title="Fashion" article={articles.articles.slice(0, 6)} />
            </div>
            <div id="secondary">
              <PopularPosts article={articles.articles} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

PopularPosts.propTypes = {
  article: PropTypes.array.isRequired,
};
