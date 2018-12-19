import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HtmlToReact from 'html-to-react';

import articlePageScript from '../../../public/js/articlePageScript';
import { sampleReportTypes, articleSample } from '../../../mockdata/samplebody';
import { formatDate, formatReadTime } from '../../utils';
import CommentBox from './CommentBox';
import fetchArticle from '../../actions/singleArticleActions';

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

SelectList.propTypes = {
  types: PropTypes.array.isRequired
};

export class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: articleSample,
      articleLikeStatus: null,
      bookmarkState: false,
      commentLikeState: [null, null],
      reportTypes: sampleReportTypes,
    };

    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleDislikeClick = this.handleDislikeClick.bind(this);
    this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
    this.handleCommentLikeClick = this.handleCommentLikeClick.bind(this);
    this.handleCommentDislikeClick = this.handleCommentDislikeClick.bind(this);
  }

  componentDidMount() {
    const { fetchSingleArticle, match } = this.props;
    fetchSingleArticle(match.params.id);
    articlePageScript();
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
    this.setState(prevState => ({
      bookmarkState: !prevState.bookmarkState
    }));
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

  render() {
    const {
      articleLikeStatus, bookmarkState, commentLikeState, reportTypes
    } = this.state;
    let { article } = this.state;
    const { payload } = this.props;
    article = payload;
    const articleBody = HtmlToReactParser.parse(article.body);
    const { author } = article;
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
                  <div className="author-container">
                    <img src={author.avatarUrl} alt="author" />
                  </div>
                  <input placeholder="Add a comment..." />
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

ArticlePage.propTypes = {
  fetchSingleArticle: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  payload: PropTypes.object.isRequired
};

export const mapStateToProps = state => ({
  payload: state.article.item
});

export const mapDispatchToProps = dispatch => ({
  fetchSingleArticle: (articleId) => {
    dispatch(fetchArticle(articleId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
