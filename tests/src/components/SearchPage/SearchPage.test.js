import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import DefaultSearchPage, { SearchPage, Filters } from '../../../../src/components/SearchPage/SearchPage';
import mockAuthors from '../../../../mockdata/authors';
import mockCategories from '../../../../mockdata/categories';
import mockTags from '../../../../mockdata/tags';
import mockSearch from '../../../../mockdata/searchResults';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { authors } = mockAuthors;
const { categories } = mockCategories;
const { tags } = mockTags;

describe('', () => {
  let component, store;
  const location = {
    search: '?search=boys&tag=1%202%203&author=4%205%206&category=fashion'
  };

  beforeEach(() => {
    const initialState = {
      global: {
        isLoading: false,
        isLoggedIn: false
      },
      categoryTitles: categories,
      authors: {
        results: authors
      },
      tagTitles: tags.rows,
      searchResults: {
        results: mockSearch,
        errors: '',
        query: 'all?limit=10&page=1',
      }
    };
    store = mockStore(initialState);
    component = shallow(<DefaultSearchPage
        store={store}
        location={location}
        handleCategoryName={jest.fn()}
        handleAuthorName={jest.fn()}
        handleTagName={jest.fn()}
      />);
  });

  it('Test search page', () => {
    expect(component).toMatchSnapshot();
  });

  it('should run getCategories()', () => {
    fetchMock.get(`${process.env.API_BASE_URL}/articles/categories`, { categories });
    const prop = component.props();
    prop.getCategories();
    const actions = store.getActions();
    expect(actions).toEqual([]);
  });

  it('should run getTags()', () => {
    fetchMock.get(`${process.env.API_BASE_URL}/articles/tags`, { tags: tags.rows });
    const prop = component.props();
    prop.getTags();
    const actions = store.getActions();
    expect(actions).toEqual([]);
  });

  it('should run getAuthors()', () => {
    fetchMock.get(`${process.env.API_BASE_URL}/users/authors`, { authors });
    const prop = component.props();
    prop.getAuthors();
    const actions = store.getActions();
    expect(actions).toEqual([]);
  });

  it('should run runSearch()', () => {
    fetchMock.get(`${process.env.API_BASE_URL}/articles/category/fashion?author=1`, { ...mockSearch });
    const prop = component.props();
    prop.runSearch('fashion?author=1');
    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'TRIGGER_LOADING', isLoading: true }]);
  });

  it('should run runSearch() and return no search results', () => {
    fetchMock.get(`${process.env.API_BASE_URL}/articles/category/fashion?author=2`, { errors: { message: 'no articles found' } });
    const prop = component.props();
    prop.runSearch('fashion?author=2');
    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'TRIGGER_LOADING', isLoading: true }]);
  });

  it('should render filters component', () => {
    const secondComponent = shallow(<Filters
        tags={tags.rows}
        categories={categories}
        authors={authors}
        handleCategoryName={jest.fn()}
        handleAuthorName={jest.fn()}
        handleTagName={jest.fn()}
      />);
    const thirdComponent = shallow(<SearchPage
        tags={tags.rows}
        categories={categories}
        authors={authors}
        handleCategoryName={jest.fn()}
        handleAuthorName={jest.fn()}
        handleTagName={jest.fn()}
        getCategories={jest.fn()}
        getAuthors={jest.fn()}
        location={location}
        getTags={jest.fn()}
        runSearch={jest.fn()}
        searchResults={mockSearch}
        previousQuery="fashion?limit=10"
        errors="no articles found"
      />);

    const fourthComponent = shallow(<SearchPage
        tags={tags.rows}
        categories={categories}
        authors={authors}
        getCategories={jest.fn()}
        getAuthors={jest.fn()}
        location={location}
        getTags={jest.fn()}
        runSearch={jest.fn()}
        searchResults={{}}
        previousQuery="fashion?limit=10"
        errors="no articles found"
      />);
    expect(secondComponent).toMatchSnapshot();
    expect(thirdComponent).toMatchSnapshot();
    expect(fourthComponent).toMatchSnapshot();
    const instance = fourthComponent.instance();

    expect(instance.state.searchTerm).toBe('boys');

    instance.handleSearchSubmit({ target: { searchTerm: { value: 'girls' } }, persist: jest.fn(), preventDefault: jest.fn() });
    expect(instance.state.searchTerm).toBe('girls');

    instance.handlePageLimit({ target: { textContent: '100' } });
    expect(instance.state.limit).toBe(100);

    instance.handleTagName([{ value: 1, label: 'football' }]);
    expect(instance.state.tagIds).toEqual([1]);

    instance.handleAuthorName([{ value: 1, label: 'football' }]);
    expect(instance.state.authorsId).toEqual([1]);

    instance.handleCategoryName({ value: 'football', label: 'football' });
    expect(instance.state.categoryName).toBe('football');

    instance.handelSearchTerm({ target: { value: 'football' } });
    expect(instance.state.searchTerm).toBe('football');

    instance.getPageNumber(3);
    expect(instance.state.pageNumber).toBe(3);

    instance.setSearchParam('categoryName', 'farmers');
    expect(instance.state.categoryName).toBe('farmers');

    instance.componentDidMount();
    expect(instance.state.categoryName).toBe('fashion');

    const fifthComponent = shallow(<Filters
        tags={tags.rows}
        categories={categories}
        authors={[]}
        handleCategoryName={jest.fn()}
        handleAuthorName={jest.fn()}
        handleTagName={jest.fn()}
      />);
    expect(fifthComponent).toMatchSnapshot();
  });
});
