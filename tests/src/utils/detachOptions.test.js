import detachOptions from '../../../src/utils/detachOptions';
import mockAuthors from '../../../mockdata/authors';
import mockCategories from '../../../mockdata/categories';

describe('Test detachOptions function', () => {
  const { authors } = mockAuthors;
  const { categories } = mockCategories;
  it('should return an array of labels and integer values for authors', () => {
    const result = detachOptions(authors, 'fullName');
    expect(result).toEqual([
      { value: 1, label: 'John Doe' },
      { value: 7, label: 'Solomon Kingsley' },
      { value: 3, label: 'Akanmu Christopher' },
      { value: 17, label: 'Augustine Ezinwa' }
    ]);
  });

  it('should return an array of labels and values for categories', () => {
    const result = detachOptions(categories, 'categoryName');
    expect(result).toEqual([
      { value: 'all', label: 'all' },
      { value: 'sports', label: 'sports' },
      { value: 'technology', label: 'technology' },
      { value: 'fashion', label: 'fashion' },
      { value: 'gaming', label: 'gaming' },
      { value: 'business', label: 'business' },
      { value: 'travel', label: 'travel' },
      { value: 'fitness', label: 'fitness' }
    ]);
  });
});
