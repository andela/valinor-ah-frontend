import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Card = (props) => {
  const {
    title,
    category,
    body,
    backgroundImage
  } = props;

  return (
    <div className="card" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="card-overlay">
        <div className="article-meta">
          <p className="category-name">{category}</p>
          <p className="title">{title}</p>
          <p className="excerpt">{`${body.slice(0, 70)}....`}</p>
        </div>
        <button className="btn" type="button">Read More</button>
      </div>
    </div>
  );
};

export const CardList = (props) => {
  const { article, title, className } = props;
  let button;
  if (className === 'home-articles-cont') {
    button = (
      <div className="read-more-btn">
        <NavLink to={`/articles/category/${title}`} className="category-link">
          <h1>
            <span className="title">view more </span>
            <i className="fas fa-long-arrow-alt-right" />
          </h1>
        </NavLink>
      </div>
    );
  }
  return (
    <div className={className}>

      <h1 className="article-title">{title}</h1>
      <NavLink to="/articles/1">
        {
          article
            .map((currentArticle, index) => (
              <Card
              category={currentArticle.category}
              title={currentArticle.title}
              body={currentArticle.body}
              backgroundImage={currentArticle.articleImage}
              key={`card${String(index)}`}
              />
            ))
        }
      </NavLink>

      {button}

    </div>
  );
};


Card.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired
};

CardList.propTypes = {
  article: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
