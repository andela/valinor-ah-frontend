import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HtmlToReact from 'html-to-react';

export const Card = (props) => {
  const {
    title,
    category,
    body,
    backgroundImage,
    link
  } = props;

  const HtmlToReactParser = new HtmlToReact.Parser();
  const excerptHtml = body.slice(0, 70);
  const excerpt = HtmlToReactParser.parse(excerptHtml);

  return (
    <div className="card" style={{ backgroundImage: 'url(https://bit.ly/2B4NZ51)' }}>
      <NavLink to={`/articles/${link}`}>
        <div className="card-overlay">
          <div className="article-meta">
            <p className="category-name">{category}</p>
            <p className="title">{title}</p>
            <p className="excerpt">
              {excerpt}
              ...
            </p>
          </div>
          <button className="btn" type="button">Read More</button>
        </div>
      </NavLink>
    </div>
  );
};

export const CardList = (props) => {
  const {
    article, title, className, pageLimit, setPageLimit
  } = props;
  let button;
  let top;
  let firstIndicator = '';
  let secondIndicator = '';
  let thirdIndicator = '';
  switch (pageLimit) {
    case 10: firstIndicator = true;
      break;
    case 50: secondIndicator = true;
      break;
    case 100: thirdIndicator = true;
      break;
    default:
  }
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
            <h3 className="m-0">{title}</h3>
          </div>
          <div className="d-flex page-limit">
            <ul className="list-inline m-0 align-self-end">
              <li className="list-inline-item">
                Articles Per Page |
              </li>
              <li className="list-inline-item">
                <Link
                  to="" value={10} onClick={setPageLimit}
                  style={firstIndicator ? { color: '#000000', fontWeight: 'bold' } : {}}>
                  10
                </Link>
                <span> | </span>
              </li>
              <li className="list-inline-item">
                <Link
                  to="" value={50} onClick={setPageLimit}
                  style={secondIndicator ? { color: '#000000', fontWeight: 'bold' } : {}}>
                  50
                </Link>
                <span> | </span>
              </li>
              <li className="list-inline-item">
                <Link
                  to="" value={100} onClick={setPageLimit}
                  style={thirdIndicator ? { color: '#000000', fontWeight: 'bold' } : {}}>
                  100
                </Link>
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
              link={currentArticle.id}
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
  link: PropTypes.number.isRequired
};

CardList.propTypes = {
  article: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  pageLimit: PropTypes.number,
  setPageLimit: PropTypes.func
};

CardList.defaultProps = {
  pageLimit: 10,
  setPageLimit: () => {}
};
