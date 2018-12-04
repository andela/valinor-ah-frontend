import React from 'react';

import ArticleCard from './ArticleCard';

const allArticlesUrl = `${process.env.API_BASE_URL}/articles/category/all`;

class AllArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentWillMount() {
    fetch(allArticlesUrl)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          articles: data.articles
        });
      })
      .catch();
  }

  render() {
    const { articles } = this.state;
    return articles.map(article => (
      <ArticleCard
        key={article.id}
        title={article.title}
        body={article.body} />
    ));
  }
}

export default AllArticles;
