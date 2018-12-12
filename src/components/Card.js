import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Card = (props) => {
  const {
    title,
    category,
    body,
    backgroundImage,
    link
  } = props;

  return (
    <div className="card" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <a href={link}>
        <div className="card-overlay">
          <div className="article-meta">
            <p className="category-name">{category}</p>
            <p className="title">{title}</p>
            <p className="excerpt">{`${body.slice(0, 70)}....`}</p>
          </div>
          <button className="btn" type="button">Read More</button>
        </div>
      </a>
    </div>
  );
};

export const CardList = (props) => {
  const {
    article, title, className
  } = props;
  let button;
  let top;
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
    top = (
      <h1 className="article-title">{title}</h1>
    );
  }

  if (className === 'category-cont') {
    top = (
      <Fragment>
        <div className="d-flex all-articles-header">
          <div className="mr-auto page-header">
            <h3 className="m-0">{ title }</h3>
          </div>
          <div className="d-flex page-limit">
            <ul className="list-inline m-0 align-self-end">
              <li className="list-inline-item">
                Articles Per Page |
              </li>
              <li className="list-inline-item">
                <a href="/"> 10</a>
                <span> | </span>
              </li>
              <li className="list-inline-item">
                <a href="/">50</a>
                <span> | </span>
              </li>
              <li className="list-inline-item">
                <a href="/">100</a>
                <span> | </span>
              </li>
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <div className={className}>

      {top}
      {
          article
            .map((currentArticle, index) => (
              <Card
                category={currentArticle.category}
                title={currentArticle.title}
                body={currentArticle.body}
                backgroundImage={currentArticle.articleImage}
                link={currentArticle.slug}
                key={`card${String(index)}`}
              />
            ))
        }

      {button}

    </div>
  );
};


Card.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

CardList.propTypes = {
  article: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
