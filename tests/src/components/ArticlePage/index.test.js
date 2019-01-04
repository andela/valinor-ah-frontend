import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import mockData from '../../../../mockdata/singleArticle';
import connectedArticlePage, {
  ArticlePage,
  SelectList,
  mapStateToProps,
} from '../../../../src/components/ArticlePage';
import { sampleReportTypes } from '../../../../mockdata/samplebody';

function setup(bookmarkStatus = false, isLoggedIn = false) {
  const props = {
    isLoggedIn,
    postArticleComment: jest.fn(),
    fetchSingleArticle: jest.fn(),
    match: { params: { id: 1 } },
    payload: mockData,
    bookmarks: {
      bookmarkStatus,
      bookmarkedArticles: [{ id: 1 }],
      errors: {}
    },
    fetchUserBookmarkedArticles: jest.fn(),
    bookmarkCurrentArticle: jest.fn()
  };

  const noQuestionProps = {
    ...props,
    payload: {},
  };

  const mockStore = configureMockStore([thunk]);
  const store = mockStore({ article: { item: mockData }, global: { isLoggedIn: false } });

  const connectedArticleWrapper = shallow(<connectedArticlePage {...props} store={store} />);
  const articlePage = shallow(<ArticlePage {...props} />);
  const noQuestionWrapper = shallow(<ArticlePage {...noQuestionProps} />);

  return {
    props,
    connectedArticleWrapper,
    articlePage,
    noQuestionWrapper,
  };
}

test('Report type select list test', () => {
  // report type select list snapshot test
  const reportTypeButton = shallow(<SelectList types={sampleReportTypes} />);
  expect(reportTypeButton).toMatchSnapshot();
});


describe('Snapshot tests', () => {
  test('connected article page snapshot', () => {
    const { connectedArticleWrapper } = setup();
    expect(connectedArticleWrapper).toMatchSnapshot();
  });

  test('unconnected article page snapshot', () => {
    const { articlePage } = setup();
    expect(articlePage).toMatchSnapshot();
  });

  test('noquestion article page snapshot', () => {
    const { noQuestionWrapper } = setup();
    expect(noQuestionWrapper).toMatchSnapshot();
  });
});


describe('Testing articlePage', () => {
  const { articlePage } = setup();
  const instanceOfArticlePage = articlePage.instance();

  test('Testing handleCommentLikeClick handler', () => {
    instanceOfArticlePage.handleCommentLikeClick(1);
    expect(instanceOfArticlePage.state.commentLikeState[1]).toEqual(true);
  });

  test('Testing handleCommentDislikeClick handler', () => {
    instanceOfArticlePage.handleCommentDislikeClick(1);
    expect(instanceOfArticlePage.state.commentLikeState[1]).toEqual(false);
  });

  test('Testing handleCommentInput', () => {
    const event = {
      target: {
        name: 'test',
        value: 'test',
      }
    };
    instanceOfArticlePage.handleCommentInput(event);
    expect(instanceOfArticlePage.state.test).toEqual(event.target.value);
  });

  test('find commentBox', () => {
    expect(articlePage.find('CommentBox')).toBeDefined();
  });

  test('ArticlePage box snapshot test', () => {
    expect(articlePage).toMatchSnapshot();
    articlePage.find('.report-article-btn').simulate('click');
  });
});

describe('Article Page logged in', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({
      id: 8,
      fullName: 'Akanmu Christopher',
      email: 'akanmuchris@gmail.com',
      roleId: 3,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNihgfoutvuvbTQ0OTYwMTM1fQ.CcU4n0W_AjwUWU03qZ1deYp9NKpmYH-P-ADtFx1I9FE'
    }));
  });
  afterEach(() => {
    localStorage.clear();
  });

  test('post comment click test', () => {
    const { props } = setup(false, true);
    const articlePageLoggedIn = shallow(<ArticlePage {...props} />);
    articlePageLoggedIn.find('.post-comment-btn').simulate('click');
  });
  test('Aritcle options click tests', () => {
    const { articlePage } = setup();
    // book mark click
    expect(articlePage.find('.fa-bookmark').first().hasClass('far')).toBe(true);
    articlePage.find('.bookmark-btn').first().simulate('click');
    expect(articlePage.find('.fa-bookmark').first().hasClass('fas')).toBe(false);
  });


  test('Aritcle options click tests', () => {
    const { articlePage } = setup(true, true);
    // book mark click
    expect(articlePage.find('.fa-bookmark').first().hasClass('far')).toBe(true);
    articlePage.find('.bookmark-btn').first().simulate('click');
    expect(articlePage.find('.fa-bookmark').first().hasClass('fas')).toBe(true);

    // like and unlike
    articlePage.find('.like-article-btn').simulate('click');
    expect(articlePage.find('.fa-thumbs-up').hasClass('fas')).toBe(true);

    articlePage.find('.like-article-btn').simulate('click');
    expect(articlePage.find('.fa-thumbs-up').hasClass('far')).toBe(true);

    // dislike and undislike
    articlePage.find('.dislike-article-btn').simulate('click');
    expect(articlePage.find('.fa-thumbs-down').hasClass('fas')).toBe(true);

    articlePage.find('.dislike-article-btn').simulate('click');
    expect(articlePage.find('.fa-thumbs-down').hasClass('far')).toBe(true);

    articlePage.find('.report-article-btn').simulate('click');
  });

  test('test lifecycle componentDidMount of article page', () => {
    const { articlePage, props } = setup(false, true);
    const { fetchUserBookmarkedArticles } = props;
    const articlePageInstance = articlePage.instance();
    articlePageInstance.componentDidMount();
    expect(fetchUserBookmarkedArticles).toHaveBeenCalled();
  });

  test('test lifecycle componentDidUpdate of article page', () => {
    const { articlePage } = setup(true, false);
    const articlePageInstance = articlePage.instance();
    const prevProps = {
      isLoggedIn: true,
      bookmarks: {
        bookmarkStatus: false
      }
    };
    articlePageInstance.updateBookmarkStatus = jest.fn();
    articlePageInstance.componentDidUpdate(prevProps);
    expect(articlePageInstance.updateBookmarkStatus).toHaveBeenCalled();
  });

  test('test lifecycle componentDidUpdate of article page', () => {
    const { articlePage } = setup(true, true);
    const articlePageInstance = articlePage.instance();
    const prevProps = {
      bookmarks: {
        bookmarkStatus: false
      }
    };
    articlePageInstance.updateBookmarkStatus = jest.fn();
    articlePageInstance.componentDidUpdate(prevProps);
    expect(articlePageInstance.updateBookmarkStatus).toHaveBeenCalled();
  });

  test('test lifecycle componentDidUpdate of article page', () => {
    const { articlePage } = setup(false, true);
    const articlePageInstance = articlePage.instance();
    const prevProps = {
      bookmarks: {
        bookmarkStatus: true
      }
    };
    articlePageInstance.updateBookmarkStatus = jest.fn();
    articlePageInstance.componentDidUpdate(prevProps);
    expect(articlePageInstance.updateBookmarkStatus).toHaveBeenCalled();
  });

  test('test lifecycle componentDidUpdate of article page', () => {
    const { articlePage } = setup(false, true);
    const articlePageInstance = articlePage.instance();
    const prevProps = {
      bookmarks: {
        bookmarkStatus: true
      }
    };
    articlePageInstance.updateBookmarkStatus = jest.fn();
    articlePageInstance.componentDidUpdate(prevProps);
    expect(articlePageInstance.updateBookmarkStatus).toHaveBeenCalled();
  });


  test('test  identifyUserBookmarks of article page', () => {
    const { articlePage } = setup(false, true);
    const articlePageInstance = articlePage.instance();
    articlePageInstance.identifyUserBookmarks();
    expect(articlePage.state('bookmarkState')).toBe(true);
  });

  test('test  identifyUserBookmarks of article page', () => {
    const { articlePage } = setup(true, true);
    const articlePageInstance = articlePage.instance();
    articlePageInstance.updateBookmarkStatus();
    expect(articlePage.state('bookmarkState')).toBe(false);
  });

  test('test handleBookmarkClicks of article page', () => {
    const { articlePage, props } = setup(false, true);
    const { bookmarkCurrentArticle } = props;
    const articlePageInstance = articlePage.instance();
    articlePageInstance.handleBookmarkClick();
    expect(articlePage.state('bookmarkState')).toBe(true);
    expect(bookmarkCurrentArticle).toHaveBeenCalled();
  });
});

test('testing mapStateToProps', () => {
  const initialState = {
    article: {
      item: {},
    },
    global: {
      isLoggedIn: true,
    },
    item: {

    }
  };
  expect(mapStateToProps(initialState).payload).toEqual({});
});
