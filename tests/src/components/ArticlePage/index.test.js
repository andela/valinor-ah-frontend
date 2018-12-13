import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import mockData from '../../../../mockdata/singleArticle';
import connectedArticlePage, {
  ArticlePage,
  SelectList,
  mapDispatchToProps,
  mapStateToProps
} from '../../../../src/components/ArticlePage';
import { sampleReportTypes } from '../../../../mockdata/samplebody';

function setup() {
  const props = {
    fetchSingleArticle: jest.fn(),
    match: { params: { id: 1 } },
    payload: mockData
  };

  const mockStore = configureMockStore();

  const store = mockStore(mockData);
  const connectedArticleWrapper = shallow(<connectedArticlePage {...props} store={store} />);

  const articlePage = shallow(<ArticlePage {...props} />);

  return {
    props,
    connectedArticleWrapper,
    articlePage
  };
}
const { connectedArticleWrapper } = setup();
const { articlePage } = setup();

describe('Testing connectedArticlePage', () => {
  test('shallow test', () => {
    expect(connectedArticleWrapper).toMatchSnapshot();
  });
  test('Testing handleCommentLikeClick handler', () => {
    const instanceOfArticlePage = articlePage.instance();
    instanceOfArticlePage.handleCommentLikeClick(1);
    expect(instanceOfArticlePage.state.commentLikeState[1]).toEqual(true);
  });
  test('Testing handleCommentDislikeClick handler', () => {
    const instanceOfArticlePage = articlePage.instance();
    instanceOfArticlePage.handleCommentDislikeClick(1);
    expect(instanceOfArticlePage.state.commentLikeState[1]).toEqual(false);
  });
  test('testing mapDispatchToProps', () => {
    const dispatch = jest.fn(() => {});
    mapDispatchToProps(dispatch).fetchSingleArticle(1);
    expect(dispatch.mock.calls.length).toBe(1);
  });
  test('testing mapStateToProps', () => {
    const initialState = {
      article: {
        item: {

        }
      }
    };
    expect(mapStateToProps(initialState).payload).toEqual({});
  });
  test('find commentBox', () => {
    expect(connectedArticleWrapper.find('CommentBox')).toBeDefined();
  });
});
test('ArticlePage box snapshot test', () => {
  expect(articlePage).toMatchSnapshot();
  articlePage.find('.report-article-btn').simulate('click');
});

test('Report type select list test', () => {
  // report type radio button snapshot test
  const reportTypeButton = shallow(<SelectList types={sampleReportTypes} />);
  expect(reportTypeButton).toMatchSnapshot();
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
