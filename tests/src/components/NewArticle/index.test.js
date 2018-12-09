import React from 'react';
import { shallow, render } from 'enzyme';

import NewArticle, { getSuggestions, CategoryDropdown, TextEditor } from '../../../../src/components/NewArticle';
import { sampleCategoryOptions } from '../../../../mockdata/samplebody';

const newArticlePage = shallow(<NewArticle />);
const instance = newArticlePage.instance();

test('New Article snapshot test', () => {
  expect(newArticlePage).toMatchSnapshot();
});

test('Category dropdown snapshot test', () => {
  const categoryDropdown = render(<CategoryDropdown
    category="Food"
    categoryOptions={sampleCategoryOptions}
    onCategoryChange={instance.handleCategoryChange} />);

  expect(categoryDropdown).toMatchSnapshot();
});

test('Text Editor snapshot test', () => {
  const textEditor = shallow(<TextEditor
    body="Truansuisnd"
    onEditorChange={instance.handleEditorChange} />);

  expect(textEditor).toMatchSnapshot();
});

test('Handler tests', () => {
  // input change handler
  const event = {
    target: { name: 'title', value: 'my title' }
  };
  newArticlePage.find('.title-input').simulate('change', event);

  // category input/ selection handler
  const selectionChange = { selectedItem: 'testing' };
  const inputChange = { inputValue: 'testing' };
  instance.handleCategoryChange(selectionChange);
  instance.handleCategoryChange(inputChange);

  // suggestions filter
  const suggestions = getSuggestions('Fo', sampleCategoryOptions);
  expect(suggestions)
    .toEqual([{ id: '1', value: 'Football' }, { id: '9', value: 'Food' }]);

  instance.handleEditorChange('this is html');

  // tag handlers
  const testTag = { id: '2', text: 'testing' };
  instance.handleAddition(testTag);
  instance.handleDrag(testTag, 2, 1);
  instance.handleDelete(1);
});
