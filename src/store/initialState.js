export default {
  global: {
    isLoggedIn: false,
    isLoading: false,
    error: []
  },
  articlesByCategory: {},
  popularArticles: {
    articles: [],
    error: []
  },
  article: {
    isLoading: false,
    item: {}
  },
  categoryTitles: [],
  tagTitles: [],
  postArticle: {
    errors: {}
  }
};
