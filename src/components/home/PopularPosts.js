import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDate } from '../../utils';

const PopularPosts = (props) => {
  const {
    article
  } = props;
  return (
    <div className="sidebar">
      <h1>Popular Posts</h1>
      <ul>
        <li>
          { article.slice(0, 6).map((currentArticle, index) => (
            <div className="pop-post" key={`post${String(index)}`}>
              <p><NavLink to="/articles/1">{currentArticle.title}</NavLink></p>
              <span>
                {`${currentArticle.author.fullName} in ${currentArticle.category} on ${formatDate(currentArticle.createdAt)}`}
              </span>
            </div>
          )) }
        </li>
      </ul>
    </div>
  );
};

PopularPosts.propTypes = {
  article: PropTypes.array.isRequired,
};

export default PopularPosts;
