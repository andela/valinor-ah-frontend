import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ArticleCard = (props) => {
  const { title, body } = props;
  return (
    <Fragment>
      <h1>{title}</h1>
      <p>{body}</p>
    </Fragment>
  );
};

ArticleCard.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
};

export default ArticleCard;
