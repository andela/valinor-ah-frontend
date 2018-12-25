import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Pagination from '../common/Pagination';
import constructQuery from '../../utils/constructQuery';
import detachOptions from '../../utils/detachOptions';
import { fetchCategoryTitles } from '../../actions/categoryActions';
import { fetchTagTitles } from '../../actions/tagActions';
import fetchAuthors from '../../actions/authorsActions';
import searchActions from '../../actions/searchActions';


export const Filters = (props) => {
  const {
    handleCategoryName,
    handleAuthorName,
    handleTagName,
    categories,
    tags,
    authors
  } = props;

  const authorOptions = (authors.length > 0 && Array.isArray(authors)) ? detachOptions(authors, 'fullName') : [];
  const tagOptions = (tags.length > 0 && Array.isArray(tags)) ? detachOptions(tags, 'tagName') : [];
  const categoryOptions = (categories.length > 0 && Array.isArray(categories)) ? detachOptions(categories, 'categoryName') : [];

  return (
    <div className="filter-options">

      <span className="filter-names">category:</span>
      <Select
        id="category-options"
        onChange={handleCategoryName}
        name="category"
        components={makeAnimated()}
        closeMenuOnSelect
        options={categoryOptions}
        defaultValue="select here bitch"
      />

      <span className="filter-names">authors:</span>
      <Select
        id="authors-options"
        onChange={handleAuthorName}
        name="author"
        components={makeAnimated()}
        closeMenuOnSelect={false}
        isMulti
        options={authorOptions}
      />

      <span className="filter-names">tags:</span>
      <Select
        id="tags-options"
        onChange={handleTagName}
        name="tag"
        components={makeAnimated()}
        closeMenuOnSelect={false}
        isMulti
        options={tagOptions}
      />

    </div>
  );
};

export class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      categoryName: 'all',
      authorsId: [],
      tagIds: [],
      limit: 10,
      pageNumber: 1
    };
    this.handelSearchTerm = this.handelSearchTerm.bind(this);
    this.handleCategoryName = this.handleCategoryName.bind(this);
    this.handleAuthorName = this.handleAuthorName.bind(this);
    this.handleTagName = this.handleTagName.bind(this);
    this.handlePageLimit = this.handlePageLimit.bind(this);
    this.getPageNumber = this.getPageNumber.bind(this);
    this.setSearchParam = this.setSearchParam.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidMount() {
    const {
      location,
      getCategories,
      getTags,
      getAuthors
    } = this.props;

    getCategories();
    getTags();
    getAuthors();

    // get queries from url
    const query = queryString.parse(location.search);

    // if there is a search query
    if (query.search) {
      this.setSearchParam('searchTerm', query.search);
    }

    // if there is a category query
    if (query.category) {
      this.setSearchParam('categoryName', query.category);
    }

    // if there is a tag query
    if (query.tag) {
      const tagArr = query.tag.split(' ');
      const result = [];
      for (let x = 0; x < tagArr.length; x += 1) {
        result.push(Number(tagArr[x]));
      }
      this.setSearchParam('tagIds', result);
    }

    // if there is an author query
    if (query.author) {
      const authorArr = query.author.split(' ');
      const result = [];
      for (let x = 0; x < authorArr.length; x += 1) {
        result.push(Number(authorArr[x]));
      }
      this.setSearchParam('authorsId', result);
    }
  }

  componentDidUpdate() {
    const {
      searchTerm,
      limit,
      pageNumber,
      categoryName,
      authorsId,
      tagIds,
    } = this.state;

    const {
      runSearch,
      previousQuery,
    } = this.props;

    const newQuery = constructQuery(
      categoryName,
      searchTerm.trim(),
      limit,
      pageNumber,
      authorsId,
      tagIds
    );
    if (previousQuery !== newQuery) {
      return runSearch(newQuery);
    }
  }

  setSearchParam(propName, value) {
    return this.setState({ [propName]: value });
  }

  getPageNumber(pageNumber) {
    return this.setState({ pageNumber });
  }

  handelSearchTerm(e) {
    return this.setState({ searchTerm: e.target.value, pageNumber: 1 });
  }

  handleCategoryName(e) {
    return this.setState({ categoryName: e.value, pageNumber: 1 });
  }

  handleAuthorName(e) {
    const authorsArray = [];
    for (let x = 0; x < e.length; x += 1) {
      authorsArray.push(e[x].value);
    }
    return this.setState({ authorsId: authorsArray, pageNumber: 1 });
  }

  handleTagName(e) {
    const tagsArray = [];
    for (let x = 0; x < e.length; x += 1) {
      tagsArray.push(e[x].value);
    }
    return this.setState({ tagIds: tagsArray, pageNumber: 1 });
  }

  handlePageLimit(e) {
    return this.setState({ limit: Number(e.target.textContent), pageNumber: 1 });
  }

  handleSearchSubmit(e) {
    e.persist();
    e.preventDefault();
    return this.setState((prevState) => {
      if (
        prevState.searchTerm !== e.target.searchTerm.value.trim()
        && e.target.searchTerm.value.trim() !== ''
      ) {
        return { searchTerm: e.target.searchTerm.value.trim(), pageNumber: 1 };
      }
    });
  }

  render() {
    const {
      searchTerm,
      limit,
      pageNumber
    } = this.state;

    const {
      categories,
      tags,
      authors,
      searchResults,
      errors
    } = this.props;

    const limitArr = [10, 50, 100];

    let body;
    let numberOfArticles;

    if (Object.keys(searchResults).length < 1) {
      body = <h3 className="no-search-results">{errors === 'no articles found' ? 'No Results for this search' : 'Search Author\'s Haven'}</h3>;
    } else {
      const { totalPages, articles, totalArticles } = searchResults;
      numberOfArticles = totalArticles;
      body = (
        <Fragment>
          <div className="search-results">
            {
              articles.map((article, index) => (
                <div key={String(index)} className="result">
                  <h6><Link to={`/articles/${article.id}`}>{article.title}</Link></h6>
                  <p className="excerpt">{article.body}</p>
                </div>
              ))
            }
          </div>
          <Pagination pageNumber={pageNumber} pages={totalPages} custom={this.getPageNumber} />
        </Fragment>
      );
    }

    return (
      <div className="site-content">
        <div className="main search-page">
          <div id="primary">
            <div className="search-params">
              <div className="search-params-options left">
                <form onSubmit={this.handleSearchSubmit}>
                  <input type="text" name="searchTerm" placeholder="search..." value={this.searchTerm !== '' ? searchTerm : ''} onChange={this.handelSearchTerm} />
                  <button type="submit">search</button>
                </form>
              </div>
              <div className="search-params-options center">
                {numberOfArticles === undefined ? 'No search results' : `${numberOfArticles} search results`}
              </div>
              <div className="search-params-options right">
                Results Per Page
                |
                {
                  limitArr.map(currentLimit => (
                    <Fragment key={String(currentLimit)}>
                      <Link to="#" className={currentLimit === limit ? 'active' : ''} onClick={this.handlePageLimit} value={currentLimit}>{currentLimit}</Link>
                      |
                    </Fragment>
                  ))
                }
              </div>
              <Filters
                handleCategoryName={this.handleCategoryName}
                handleAuthorName={this.handleAuthorName}
                handleTagName={this.handleTagName}
                categories={categories}
                tags={tags}
                authors={authors}
              />
            </div>
            <div className="search-results">
              {body}
            </div>
          </div>
          <div id="secondary">
            <h1>filter</h1>
            <Filters
              handleCategoryName={this.handleCategoryName}
              handleAuthorName={this.handleAuthorName}
              handleTagName={this.handleTagName}
              categories={categories}
              tags={tags}
              authors={authors}
            />
          </div>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  handleCategoryName: PropTypes.func.isRequired,
  handleAuthorName: PropTypes.func.isRequired,
  handleTagName: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
};

SearchPage.propTypes = {
  location: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  getTags: PropTypes.func.isRequired,
  getAuthors: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  runSearch: PropTypes.func.isRequired,
  searchResults: PropTypes.object.isRequired,
  previousQuery: PropTypes.string.isRequired,
  errors: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  categories: state.categoryTitles,
  tags: state.tagTitles,
  authors: state.authors.results,
  searchResults: state.searchResults.results,
  errors: state.searchResults.errors,
  previousQuery: state.searchResults.query,
});

const mapDispatchToProps = dispatch => ({
  runSearch: searchTerm => dispatch(searchActions(searchTerm)),
  getCategories: () => dispatch(fetchCategoryTitles()),
  getTags: () => dispatch(fetchTagTitles()),
  getAuthors: () => dispatch(fetchAuthors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
