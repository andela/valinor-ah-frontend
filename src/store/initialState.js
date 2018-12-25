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
  authors: {
    results: [],
    errors: {},
  },
  searchResults: {
    results: {},
    query: 'all?limit=10&page=1',
    errors: ''
  }
};
