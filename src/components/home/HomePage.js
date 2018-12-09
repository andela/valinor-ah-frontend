import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CardList } from '../Card';
import {
  facebookAuthFailure, facebookAuthSuccess
} from '../../actions/userActions';
import { isUserLoggedIn } from '../../utils/verifyToken';
// import formatDate from '../../utils/dateUtils';
import mockArticles from '../../../mockdata/articles';
import PopularPosts from './PopularPosts';


export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: mockArticles
    };
  }


  componentDidMount() {
    const { logout, login } = this.props;
    if (!isUserLoggedIn()) logout();
    if (isUserLoggedIn()) login();
  }

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

PopularPosts.propTypes = {
  article: PropTypes.array.isRequired,
};

HomePage.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export const mapStateToProps = state => ({
  status: state.global
});

export const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(facebookAuthFailure({ error: 'your session expired, please login' }));
  },
  login: () => dispatch(facebookAuthSuccess()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
