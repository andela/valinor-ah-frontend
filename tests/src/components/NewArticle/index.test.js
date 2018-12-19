import React from 'react';
import Enzyme, { shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ConnectedNewArticle, {
  NewArticle, getSuggestions, CategoryDropdown, TextEditor
} from '../../../../src/components/NewArticle';
import { sampleCategoryOptions, sampleTagOptions } from '../../../../mockdata/samplebody';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  requestCategoryTitles: jest.fn(),
  categoryOptions: sampleCategoryOptions,
  requestTagTitles: jest.fn(),
  tagOptions: sampleTagOptions,
  requestPostArticle: jest.fn(),
  isLoggedIn: true,
  history: {},
};

function setup() {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore({
    categoryTitles: sampleCategoryOptions,
    tagTitles: sampleTagOptions,
    postArticle: {
      errors: {}
    },
    global: {
      isLoggedIn: true
    }
  });

  const newArticleWrapper = shallow(<NewArticle {...props} />);
  const loggedOutProps = {
    ...props,
    isLoggedIn: false,
  };
  const signUpPageRedirect = shallow(<NewArticle {...loggedOutProps} />);
  const connectedWrapper = shallow(<ConnectedNewArticle {...props} store={store} />);

  return {
    props,
    newArticleWrapper,
    signUpPageRedirect,
    connectedWrapper
  };
}

const { newArticleWrapper, signUpPageRedirect } = setup();
const newArticleInstance = newArticleWrapper.instance();

test('New Article snapshot test', () => {
  expect(newArticleWrapper).toMatchSnapshot();
  expect(signUpPageRedirect).toMatchSnapshot();
});

test('Category dropdown snapshot test', () => {
  const categoryDropdown = render(<CategoryDropdown
    category="Food"
    categoryOptions={sampleCategoryOptions}
    onCategoryChange={newArticleInstance.handleCategoryChange} />);

  expect(categoryDropdown).toMatchSnapshot();
});

test('Text Editor snapshot test', () => {
  const textEditor = shallow(<TextEditor
    body="Truansuisnd"
    onEditorChange={newArticleInstance.handleEditorChange} />);

  expect(textEditor).toMatchSnapshot();
});

test('Handler tests', () => {
  // input change handler
  const event = {
    target: { name: 'title', value: 'my title' }
  };
  newArticleWrapper.find('.title-input').simulate('change', event);

  // category input/ selection handler
  const selectionChange = { selectedItem: 'selecttesting' };
  const inputChange = { inputValue: 'inputtesting' };
  const undefinedChange = {};
  newArticleInstance.handleCategoryChange(selectionChange);
  expect(newArticleInstance.state.category).toEqual('selecttesting');

  newArticleInstance.handleCategoryChange(inputChange);
  expect(newArticleInstance.state.category).toEqual('inputtesting');

  newArticleInstance.handleCategoryChange(undefinedChange);
  expect(newArticleInstance.state.category).toEqual('inputtesting');

  // suggestions filter
  const suggestions = getSuggestions('Fo', sampleCategoryOptions);
  expect(suggestions)
    .toEqual([{ id: '1', categoryName: 'Football' }, { id: '9', categoryName: 'Food' }]);

  // text editor handler
  newArticleInstance.handleEditorChange('this is html');
  expect(newArticleInstance.state.body).toEqual('this is html');

  // tag handlers
  const testTag = { id: '2', text: 'testing' };
  newArticleInstance.handleAddition(testTag);
  newArticleInstance.handleDrag(testTag, 2, 1);
  newArticleInstance.handleDelete(1);

  // submit handlers
  const publishEvent = {
    target: { className: 'btn-publish' }
  };
  const draftEvent = {
    target: { className: 'btn-draft' }
  };
  newArticleInstance.handleSubmit(publishEvent);
  expect(props.requestPostArticle.mock.calls.length).toBe(1);

  newArticleInstance.handleSubmit(draftEvent);
  expect(props.requestPostArticle.mock.calls.length).toBe(2);
});
