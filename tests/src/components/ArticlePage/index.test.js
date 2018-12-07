import React from 'react';
import { shallow } from 'enzyme';

import ArticlePage, { SelectList } from '../../../../src/components/ArticlePage';
import { sampleReportTypes } from '../../../../mockdata/samplebody';

const articlePage = shallow(<ArticlePage />);

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
