import React from 'react';
import PropTypes from 'prop-types';
import cardImg from '../../../public/images/card-image.jpg';
import editArticle from '../../../public/images/edit.png';
import trashArticle from '../../../public/images/rubbish-bin.png';

const UserArticles = (props) => {
  const { articles, firstName } = props;

  return (
    <div>
      <p className="user-article-heading mt-4">
        {`${firstName}'s`}
        &nbsp;Recent Article's
      </p>
      {
        articles.map((article, index) => (
          <div className="row border-bottom p-3" key={`article${String(index)}`}>
            <div className="col-lg-5">
              <img className="img-fluid article-image" src={cardImg} alt="article" />
            </div>
            <div className="col-lg-7">
              <div className="d-flex article-info h-100 align-items-center">
                <div className="w-100">
                  <p className="article-title">{article.title}</p>
                  <p className="article-desc">{article.description}</p>
                  <a className="btn btn-primary" href="/" role="button">Read More</a>
                  <div className="article-buttons mt-3">
                    <div className="ratings float-left">
                      <ul className="list-inline">
                        <li className="list-inline-item"><i className="fas fa-star" /></li>
                        <li className="list-inline-item"><i className="fas fa-star" /></li>
                        <li className="list-inline-item"><i className="fas fa-star" /></li>
                        <li className="list-inline-item"><i className="fas fa-star" /></li>
                        <li className="list-inline-item"><i className="fas fa-star" /></li>
                      </ul>
                    </div>
                    <div className="float-right controls">
                      <img className="img-fluid" src={editArticle} alt="edit" />
                      <img className="img-fluid" src={trashArticle} alt="delete" />
                    </div>
                    <div className="clear" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

UserArticles.propTypes = {
  articles: PropTypes.array.isRequired,
  firstName: PropTypes.string.isRequired
};

export default UserArticles;
