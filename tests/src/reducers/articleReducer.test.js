import singleArticleReducer from '../../../src/reducers/singleArticleReducer';

const initialState = {
  isLoading: false,
  item: {}
};
const mockAction = {
  type: 'RECEIVE_ARTICLE_SUCCESS',
  isLoading: false,
  item: {
    article: {
      id: 1,
      artcleImage: 'https://bit.ly/2CaG1ce',
      title: 'My story at the beach',
      slug: 'My-story-at-the-beach-2324232323',
      description: 'This is my story at the beach',
      body: 'Once upon a time in Mexico.. there was ...',
      readTime: 3600,
      category: 'sports',
      rating: null,
      likes: 2,
      dislikes: 0,
      status: 'publish',
      commentsCount: 6,
      createdAt: '2018-12-18T19:24:32.889Z',
      updatedAt: '2018-12-18T19:24:32.889Z',
    }
  }
};

describe('Article reducer', () => {
  it('should return the initial state', () => {
    expect(singleArticleReducer(initialState, {})).toEqual(initialState);
  });
  it('should return isLoading:false and item', () => {
    expect(singleArticleReducer(initialState, mockAction))
      .toEqual({
        isLoading: false,
        item: {
          id: 1,
          artcleImage: 'https://bit.ly/2CaG1ce',
          title: 'My story at the beach',
          slug: 'My-story-at-the-beach-2324232323',
          description: 'This is my story at the beach',
          body: 'Once upon a time in Mexico.. there was ...',
          readTime: 3600,
          category: 'sports',
          rating: null,
          likes: 2,
          dislikes: 0,
          status: 'publish',
          commentsCount: 6,
          createdAt: '2018-12-18T19:24:32.889Z',
          updatedAt: '2018-12-18T19:24:32.889Z',
        }
      });
  });
});
