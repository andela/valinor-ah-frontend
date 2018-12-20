import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../common/Pagination';
import mockArticles from '../../../mockdata/articles';
import mockAuthors from '../../../mockdata/authors';
import mockTags from '../../../mockdata/tags';
import mockCategories from '../../../mockdata/categories';

const { articles } = mockArticles;
const { authors } = mockAuthors;
const { categories } = mockCategories;
const { rows } = mockTags.tags;

export const Filters = () => (
  <div className="filter-options">

    <span className="filter-names">category:</span>
    <select id="category-options">
      <option value="" defaultValue />
      {
        categories.map((category, index) => (
          <option value={category.id} key={String(index)}>{category.categoryName}</option>
        ))
      }
    </select>

    <span className="filter-names">authors:</span>
    <select id="authors-options">
      <option value="" defaultValue />
      {
        authors.map((author, index) => (
          <option value={author.id} key={String(index)}>{author.fullName}</option>
        ))
      }
    </select>

    <span className="filter-names">tags:</span>
    <select id="tags-options">
      <option value="" defaultValue />
      {
        rows.map((tag, index) => (
          <option value={tag.id} key={String(index)}>{tag.tagName}</option>
        ))
      }
    </select>

  </div>
);


class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="site-content">
        <div className="main search-page">
          <div id="primary">
            <div className="search-params">
              <div className="search-params-options left">
                <form>
                  <input type="text" placeholder="search..." />
                  <button type="submit">search</button>
                </form>
              </div>
              <div className="search-params-options center">
                {`${mockArticles.totalArticles} search results`}
              </div>
              <div className="search-params-options right">
                Results Per Page
                |
                <a href="#">10</a>
                |
                <a href="#" className="active">50</a>
                |
                <a href="#">100</a>
                |
              </div>
              <Filters />
            </div>
            <div className="search-results">
              {
                articles.map((article, index) => (
                  <div key={String(index)} className="result">
                    <h6><Link to={`/articles/${article.slug}`}>{article.title}</Link></h6>
                    <p className="excerpt">{article.body}</p>
                  </div>
                ))
              }
            </div>
            <Pagination pages={20} />
          </div>
          <div id="secondary">
            <h1>filter</h1>
            <Filters />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPage;
