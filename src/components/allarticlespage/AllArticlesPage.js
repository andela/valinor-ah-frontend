import React, { Fragment } from 'react';
import { CardList } from '../Card';
import mockArticles from '../../../mockdata/articles';
import PopularPosts from '../home/PopularPosts';

const allArticles = () => {
  const { articles } = mockArticles;
  const pathArray = window.location.pathname.split('/');
  const category = (pathArray[pathArray.length - 1]).replace('%20', ' ');

  return (
    <Fragment>
      <div className="site-content">
        <div className="main all-articles-main">
          <div id="primary">
            <CardList className="category-cont" title={category} article={articles} />

            <nav aria-label="Page pagination-navigation">
              <ul className="pagination justify-content-end">
                <li className="page-item left-arrow">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&lt;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">4</a></li>
                <li className="page-item"><a className="page-link" href="#">...</a></li>
                <li className="page-item"><a className="page-link" href="#">10</a></li>
                <li className="page-item right-arrow">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&gt;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div id="secondary">
            <PopularPosts articles={articles} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default allArticles;
