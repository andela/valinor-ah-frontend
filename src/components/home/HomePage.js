import React, { Component, Fragment } from 'react';
import { CardList } from '../Card';
import mockArticles from '../../../mockdata/articles';
import PopularPosts from './PopularPosts';

class HomePage extends Component {
  state = {
    articles: mockArticles
  };

  render() {
    const { articles } = this.state;
    return (
      <Fragment>
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

export default HomePage;
