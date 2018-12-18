import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDate } from '../../utils';

const PopularPosts = (props) => {
  const {
    articles
  } = props;
  if (!articles.length) {
    return null;
  }
  return (
    <div className="sidebar">
      <h1>Popular Posts</h1>
      <ul>
        <li>
          { articles.map((currentArticle, index) => {
            const { author, category } = currentArticle;
            return (
              <div className="pop-post" key={`post${String(index)}`}>
                <p><NavLink to={`/articles/${currentArticle.id}`}>{currentArticle.title}</NavLink></p>
                <span>
                  {<NavLink to={`/users/${author.id}`}>{author.fullName}</NavLink>}
                  &nbsp;in&nbsp;
                  {<NavLink to={`/articles/category/${category.categoryName}`}>{category.categoryName}</NavLink>}
                  &nbsp;on&nbsp;
                  {formatDate(currentArticle.createdAt)}
                </span>
              </div>);
          })}
        </li>
      </ul>
    </div>
  );
};

PopularPosts.propTypes = {
  articles: PropTypes.array.isRequired,
};

export default PopularPosts;
