import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import { CardList } from '../Card';
import Pagination from '../common/Pagination';
import PopularPosts from '../home/PopularPosts';
import { fetchCategory } from '../../actions/articleActions';

export class AllArticlesPage extends Component {
  constructor(props) {
    super(props);
    this.state = { pageLimit: 10, pageNumber: 1 };
    this.setPageLimit = this.setPageLimit.bind(this);
    this.custom = this.custom.bind(this);
  }

  componentDidMount() {
    const { getArticles, match } = this.props;
    getArticles(match.params.categoryName);
  }

  componentDidUpdate(prevProps, prevState) {
    const { pageNumber, pageLimit } = this.state;
    const {
      getArticles,
      match,
      // pageNumber,
    } = this.props;
    if (prevState.pageNumber !== pageNumber || prevState.pageLimit !== pageLimit) {
      getArticles(match.params.categoryName, pageNumber, pageLimit);
    }
  }

  setPageLimit(e) {
    e.preventDefault();
    this.setState({ pageLimit: Number(e.target.attributes[0].value), pageNumber: 1 });
  }

  custom(currentClickedPageButton) {
    return this.setState({ pageNumber: currentClickedPageButton });
  }

  fetchArticlesFromClicks(currentClickedPageButton) {
    const { pageLimit } = this.state;
    const { getArticles, match } = this.props;
    return getArticles(match.params.categoryName, currentClickedPageButton, pageLimit);
  }

  render() {
    const {
      match, articles, popularPosts
    } = this.props;
    const { pageLimit, pageNumber } = this.state;
    const categoryTitle = match.params.categoryName;
    const articleList = articles[categoryTitle] ? articles[categoryTitle].articles : '';
    const displayError = !articleList;
    if (displayError) {
      toastr.error('Sorry this category doesnt exist');
      return <Redirect to="/" />;
    }
    return (

      <Fragment>
        <div className="site-content">
          <div className="main all-articles-main">
            <div id="primary">
              <CardList
                className="category-cont"
                title={categoryTitle}
                article={articleList} pageLimit={pageLimit}
                setPageLimit={this.setPageLimit} />
              <nav aria-label="Page pagination-navigation">
                <ul className="pagination justify-content-end">
                  <Pagination
                    pages={articles[categoryTitle].totalPages}
                    pageNumber={pageNumber}
                    custom={this.custom} />
                </ul>
              </nav>

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

AllArticlesPage.propTypes = {
  getArticles: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  articles: PropTypes.object.isRequired,
  popularPosts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  articles: state.articlesByCategory,
  popularPosts: state.popularArticles
});

export const mapDispatchToProps = dispatch => ({
  getArticles: (categoryName, page, limit) => {
    dispatch(fetchCategory(categoryName, page, limit));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AllArticlesPage);
