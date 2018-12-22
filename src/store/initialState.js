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
    item: {
      createdAt: '',
      readTime: '',
      comments: [],
      author: {}
    }
  },
  categoryTitles: [],
  tagTitles: [],
  postArticle: {
    errors: {}
  },
};
