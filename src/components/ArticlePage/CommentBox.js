import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../utils/index';


const CommentBox = (props) => {
  const {
    comment, commentLikeStatus, onCommentLikeClick, onCommentDislikeClick
  } = props;
  const likeClass = commentLikeStatus
    ? 'fas fa-thumbs-up' : 'far fa-thumbs-up';
  const dislikeClass = !commentLikeStatus && commentLikeStatus !== null
    ? 'fas fa-thumbs-down' : 'far fa-thumbs-down';
  return (
    <Fragment>
      <div className="comment-box">
        <div className="author-container">
          <img src={comment.author.avatarUrl} alt="author" />
          <div>
            <span id="author-name">{comment.author.fullName}</span>
            <div>
              <span id="author-date">{formatDate(comment.createdAt)}</span>
            </div>
          </div>
        </div>

        <p>{comment.body}</p>
        <div className="options-container">
          <button type="button" className="comment-like-btn" onClick={onCommentLikeClick}>
            <i className={likeClass} />
          </button>
          <button type="button" className="comment-dislike-btn" onClick={onCommentDislikeClick}>
            <i className={dislikeClass} />
          </button>
          <i className="fa fa-ellipsis-v comment-options-btn" />
          <div className="options-menu">
            <ul>
              <li className="options-menuitem active">edit</li>
              <li className="options-menuitem">delete</li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

CommentBox.defaultProps = {
  commentLikeStatus: null
};

CommentBox.propTypes = {
  comment: PropTypes.object.isRequired,
  commentLikeStatus: PropTypes.bool,
  onCommentLikeClick: PropTypes.func.isRequired,
  onCommentDislikeClick: PropTypes.func.isRequired,
};

export default CommentBox;
