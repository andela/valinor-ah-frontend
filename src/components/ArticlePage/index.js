import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HtmlToReact from 'html-to-react';
import { NavLink } from 'react-router-dom';

import { toastr } from 'react-redux-toastr';
import articlePageScript from '../../../public/js/articlePageScript';
import { sampleReportTypes } from '../../../mockdata/samplebody';
import { formatDate, formatReadTime } from '../../utils';
import CommentBox from './CommentBox';
import fetchArticle from '../../actions/singleArticleActions';
import { postComment } from '../../actions/commentActions';
import getToken from '../../utils/getToken';
import { fetchUserBookmarks, bookmarkArticle } from '../../actions/bookmarkActions';

const HtmlToReactParser = new HtmlToReact.Parser();

export const SelectList = (props) => {
  const { types } = props;
  return (
    <Fragment>
      <select className="select">
        {types.map((type, index) => (
          <option key={type.id} value={index}>{type.value}</option>
        ))}
      </select>
    </Fragment>
  );
};

export class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleLikeStatus: null,
      bookmarkState: false,
      commentLikeState: [null, null],
      reportTypes: sampleReportTypes,
      commentInput: '',
    };

    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleDislikeClick = this.handleDislikeClick.bind(this);
    this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
    this.handleCommentLikeClick = this.handleCommentLikeClick.bind(this);
    this.handleCommentDislikeClick = this.handleCommentDislikeClick.bind(this);
    this.handleCommentInput = this.handleCommentInput.bind(this);
    this.handleCommentPost = this.handleCommentPost.bind(this);
    this.identifyUserBookmarks = this.identifyUserBookmarks.bind(this);
    this.updateBookmarkStatus = this.updateBookmarkStatus.bind(this);
  }

  componentDidMount() {
    const {
      fetchSingleArticle, match, isLoggedIn, fetchUserBookmarkedArticles
    } = this.props;
    fetchSingleArticle(match.params.id);
    articlePageScript();
    if (isLoggedIn) fetchUserBookmarkedArticles();
  }

  componentDidUpdate(prevProps) {
    // const { bookmarkState } = this.state;
    const { bookmarks, isLoggedIn } = this.props;
    const { bookmarkStatus, bookmarkedArticles } = bookmarks;
    if ((prevProps.isLoggedIn !== isLoggedIn && !isLoggedIn)) {
      return this.updateBookmarkStatus(false);
    }
    if ((prevProps.bookmarks.bookmarkStatus !== bookmarkStatus) && bookmarkStatus) {
      toastr.success('you have added this article to your bookmarks');
      return this.updateBookmarkStatus(true);
    }
    if ((prevProps.bookmarks.bookmarkStatus !== bookmarkStatus) && !bookmarkStatus) {
      toastr.success('you have unbookmarked this article');
      return this.updateBookmarkStatus(false);
    }
    if ((prevProps.bookmarks.bookmarkedArticles !== bookmarkedArticles)
     && bookmarkedArticles.length) {
      return this.identifyUserBookmarks();
    }
  }

  // click handlers
  handleLikeClick() {
    // TODO: fire off like action here
    this.setState(prevState => ({
      articleLikeStatus: prevState.articleLikeStatus ? null : true
    }));
  }

  handleDislikeClick() {
    // TODO: fire off dislike action here
    this.setState(prevState => ({
      articleLikeStatus: prevState.articleLikeStatus === false ? null : false
    }));
  }

  handleBookmarkClick() {
    const { isLoggedIn, bookmarkCurrentArticle, match } = this.props;
    if (!isLoggedIn) return toastr.error('please log in to bookmark this article');
    this.setState((prevState) => {
      bookmarkCurrentArticle(match.params.id);
      return ({
        bookmarkState: !prevState.bookmarkState
      });
    });
  }

  handleCommentLikeClick(index) {
    // TODO: fire off like action here
    this.setState((prevState) => {
      const newState = [...prevState.commentLikeState];
      newState[index] = prevState.commentLikeState[index] ? null : true;
      return ({
        commentLikeState: newState
      });
    });
  }

  handleCommentDislikeClick(index) {
    // TODO: fire off like action here
    this.setState((prevState) => {
      const newState = [...prevState.commentLikeState];
      newState[index] = prevState.commentLikeState[index] === false ? null : false;
      return ({
        commentLikeState: newState
      });
    });
  }

  handleCommentInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleCommentPost() {
    const { commentInput } = this.state;
    const { payload, postArticleComment } = this.props;

    const body = {
      body: commentInput,
    };
    postArticleComment(payload.id, body);
    this.setState({
      commentInput: ''
    });
  }

  identifyUserBookmarks() {
    const { bookmarks, match } = this.props;
    const { bookmarkedArticles } = bookmarks;
    const currentViewedArticleId = +match.params.id;
    let isBookmarked;
    if (bookmarkedArticles.length) {
      isBookmarked = bookmarkedArticles
        .find(articleUnderProbe => +articleUnderProbe.id === currentViewedArticleId) ? true : null;
    }
    if (isBookmarked) return this.setState({ bookmarkState: true });
  }

  updateBookmarkStatus(status = false) {
    this.setState({ bookmarkState: status });
  }

  render() {
    const {
      articleLikeStatus, bookmarkState, commentLikeState, reportTypes, commentInput,
    } = this.state;

    const { payload, isLoggedIn } = this.props;

    const article = payload;

    // get author information
    const { author } = article;

    // parse html article body to react
    const articleBody = HtmlToReactParser.parse(article.body);

    // get user information from local storage

    const user = getToken(true);
    const userFullName = user ? user.fullName : '';

    // resolve button classes based on state
    const likeClass = articleLikeStatus
      ? 'fas fa-thumbs-up fa-2x' : 'far fa-thumbs-up fa-2x';
    const dislikeClass = !articleLikeStatus && articleLikeStatus !== null
      ? 'fas fa-thumbs-down fa-2x' : 'far fa-thumbs-down fa-2x';
    const bookmarkClass = bookmarkState
      ? 'fas fa-bookmark fa-2x' : 'far fa-bookmark fa-2x';


    return (
      (Object.keys(payload).length < 1) ? (<div />)
        : (
          <div className="site-content">
            <div className="report-modal">
              <button type="button" className="modal-close-btn">&times;</button>
              <form className="report-form">
                <h1>Report Article</h1>
                <label className="select-list" htmlFor="select-list">
                  <span>Type</span>
                  <SelectList types={reportTypes} />
                </label>
                <label>
                  <span>Body</span>
                  <textarea placeholder="Please provide the reason for your report" />
                </label>
                <div className="report-save-options">
                  <button type="submit" className="btn-submit-report">Report</button>
                  <button type="button" className="btn-cancel-report">Cancel</button>
                </div>
              </form>
            </div>
            <div className="article-image-container" style={{ backgroundImage: `url(${article.articleImage})` }}>
              <i id="back-btn" />
              <button type="button" id="bookmark-btn-first" className="bookmark-btn" onClick={this.handleBookmarkClick}>
                <i id="bookmark-btn" className={bookmarkClass} />
              </button>
            </div>
            <div className="article-content">
              <span id="article-category">{article.category}</span>
              <span id="article-title">{article.title}</span>
              <div className="article-main">
                <div className="author-container">
                  <img src={author.avatarUrl} alt="author" />
                  <div>
                    <span id="author-name">{author.fullName}</span>
                    <div>
                      <span id="author-date">{formatDate(article.createdAt)}</span>
                  •
                      <span id="read-time">{formatReadTime(article.readTime)}</span>
                    </div>
                  </div>
                </div>
                <div className="article-body">
                  {articleBody}
                  <br />
                </div>
                <div className="article-options">
                  <div className="article-share-options">
                    <button type="button" className="bookmark-btn" onClick={this.handleBookmarkClick}>
                      <i className={bookmarkClass} />
                    </button>
                    <i id="goolge-icon" />
                    <i id="facebook-icon" />
                    <i id="twitter-icon" />
                  </div>
                  <div className="article-like-options">
                    <button type="button" className="like-article-btn" onClick={this.handleLikeClick}>
                      <i className={likeClass} />
                    </button>
                    <button type="button" className="dislike-article-btn" onClick={this.handleDislikeClick}>
                      <i className={dislikeClass} />
                    </button>
                    <button type="button" className="report-article-btn">
                      <i className="far fa-flag fa-2x" />
                    </button>
                  </div>
                </div>
              </div>

              <hr />
              <div className="comment-content">
                <span>Comments</span>

                <div className="new-comment">
                  {(isLoggedIn) ? (
                    <Fragment>
                      <div className="author-container">
                        <img src="https://bit.ly/2Bzc7wF" alt="author" />
                        <span id="author-name">{userFullName}</span>
                      </div>
                      <textarea
                        name="commentInput"
                        placeholder="Add a comment..."
                        value={commentInput}
                        onChange={this.handleCommentInput} />
                      <button
                        className="post-comment-btn"
                        type="button"
                        onClick={this.handleCommentPost}>
                        POST
                      </button>
                    </Fragment>
                  ) : (
                    <div className="author-container">
                      <NavLink to="/signup">
                        <img src="https://bit.ly/2Bzc7wF" alt="author" />
                        Sign up&nbsp;
                      </NavLink>
                      or&nbsp;
                      <NavLink to="/login">
                      login&nbsp;
                      </NavLink>
                      to post a comment
                    </div>
                  )}
                </div>

                <div className="comment-list">
                  {article.comments
                    .map((commentItem, index) => (
                      <CommentBox
                    key={commentItem.id}
                    comment={commentItem}
                    commentLikeStatus={commentLikeState[index]}
                    onCommentLikeClick={this.handleCommentLikeClick.bind(this, index)}
                    onCommentDislikeClick={this.handleCommentDislikeClick.bind(this, index)} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        )

    );
  }
}

SelectList.propTypes = {
  types: PropTypes.array.isRequired
};

ArticlePage.propTypes = {
  fetchSingleArticle: PropTypes.func.isRequired,
  postArticleComment: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  payload: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  bookmarks: PropTypes.object.isRequired,
  bookmarkCurrentArticle: PropTypes.func.isRequired,
  fetchUserBookmarkedArticles: PropTypes.func.isRequired
};

export const mapStateToProps = state => ({
  payload: state.article.item,
  isLoggedIn: state.global.isLoggedIn,
  bookmarks: state.bookmarks,
});

const mapActionsToProps = {
  postArticleComment: postComment,
  fetchSingleArticle: fetchArticle,
  bookmarkCurrentArticle: bookmarkArticle,
  fetchUserBookmarkedArticles: fetchUserBookmarks
};


export default connect(mapStateToProps, mapActionsToProps)(ArticlePage);
