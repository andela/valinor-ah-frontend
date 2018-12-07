import React from 'react';
import { shallow } from 'enzyme';

import CommentBox from '../../../../src/components/ArticlePage/CommentBox';
import ArticlePage from '../../../../src/components/ArticlePage';

const comment = {
  id: 1,
  date: '12 November, 2018',
  body: 'test comment body',
  author: {
    fullName: 'Chris Akanmu',
    avatarUrl: 'https://res.cloudinary.com/vivavalinor/image/upload/v1541446448/nql15siqfajqpsrudk7b.jpg'
  }
};

const articlePage = shallow(<ArticlePage />);
const instance = articlePage.instance();
const likeClick = instance.handleCommentLikeClick;
const dislikeClick = instance.handleCommentDislikeClick;

const commentBox = shallow(<CommentBox
  comment={comment}
  commentLikeStatus={null}
  onCommentLikeClick={likeClick}
  onCommentDislikeClick={dislikeClick} />);

test('Comment box snapshot test', () => {
  expect(commentBox).toMatchSnapshot();
});

test('Comment box options click tests', () => {
  // like and unlike
  commentBox.find('.comment-like-btn').simulate('click');
  commentBox.find('.comment-like-btn').simulate('click');
  expect(commentBox.find('.fa-thumbs-up').hasClass('far')).toBe(true);

  // dislike and undislike
  commentBox.find('.comment-dislike-btn').simulate('click');
  commentBox.find('.comment-dislike-btn').simulate('click');
  expect(commentBox.find('.fa-thumbs-down').hasClass('far')).toBe(true);
});

test('Comment box with like snapshot test', () => {
  const commentBoxLike = shallow(<CommentBox
      comment={comment}
      commentLikeStatus
      onCommentLikeClick={likeClick}
      onCommentDislikeClick={dislikeClick} />);
  expect(commentBoxLike).toMatchSnapshot();
});

test('Comment box with dislike snapshot test', () => {
  const commentBoxDislike = shallow(<CommentBox
      comment={comment}
      commentLikeStatus={false}
      onCommentLikeClick={likeClick}
      onCommentDislikeClick={dislikeClick} />);
  expect(commentBoxDislike).toMatchSnapshot();
});
