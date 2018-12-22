import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import mockData from '../../../../mockdata/singleArticle';
import connectedArticlePage, {
  ArticlePage,
  SelectList,
  mapStateToProps
} from '../../../../src/components/ArticlePage';
import { sampleReportTypes } from '../../../../mockdata/samplebody';

function setup() {
  const props = {
    isLoggedIn: false,
    postArticleComment: jest.fn(),
    fetchSingleArticle: jest.fn(),
    match: { params: { id: 1 } },
    payload: mockData
  };

  const noQuestionProps = {
    ...props,
    payload: {},
  };

  const mockStore = configureMockStore([thunk]);
  const store = mockStore({
    global: {
      isLoggedIn: true
    },
    article: {
      item: {}
    },
  });

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
const { connectedArticleWrapper, articlePage, noQuestionWrapper } = setup();


test('Report type select list test', () => {
  // report type select list snapshot test
  const reportTypeButton = shallow(<SelectList types={sampleReportTypes} />);
  expect(reportTypeButton).toMatchSnapshot();
});


describe('Snapshot tests', () => {
  test('connected article page snapshot', () => {
    expect(connectedArticleWrapper).toMatchSnapshot();
  });

  test('unconnected article page snapshot', () => {
    expect(articlePage).toMatchSnapshot();
  });

  test('noquestion article page snapshot', () => {
    expect(noQuestionWrapper).toMatchSnapshot();
  });
});


describe('Testing articlePage', () => {
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

  test('testing mapStateToProps', () => {
    const initialState = {
      article: {
        item: {},
      },
      global: {
        isLoggedIn: true,
      },
    };
    expect(mapStateToProps(initialState).payload).toEqual({});
  });

  test('find commentBox', () => {
    expect(articlePage.find('CommentBox')).toBeDefined();
  });
});


describe('Article Page logged in', () => {
  const { props } = setup();
  props.isLoggedIn = true;

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
    const articlePageLoggedIn = shallow(<ArticlePage {...props} />);
    articlePageLoggedIn.find('.post-comment-btn').simulate('click');
  });

  test('Aritcle options click tests', () => {
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
});
