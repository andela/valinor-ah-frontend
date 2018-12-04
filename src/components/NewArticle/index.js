import React from 'react';


import SaveOptions from './SaveOptions';
import InputBox from './InputBox';
import ArticleEditor from './ArticleEditor';
import CategoryInput from './CategoryInput';
import TagInput from './TagInput';

class NewArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryOptions: [
        { id: 'Football', label: 'Football' },
        { id: 'Gaming', label: 'Gaming' },
        { id: 'Programming', label: 'Programming' },
      ],
      tagOptions: [
        { id: 'Andela', text: 'Andela' },
        { id: 'Bootcamp', text: 'Bootcamp' },
        { id: 'Cohort-41', text: 'Cohort-41' },
        { id: 'Learning', text: 'Learning' },
        { id: 'Gaming', text: 'Gaming' },
        { id: 'Food', text: 'Food' }
      ]
    };
  }

  render() {
    const { categoryOptions, tagOptions } = this.state;

    return (
      <div className="new-article-body">
        <InputBox
          label="Title"
          placeholder="Add title here"
          className="input title" />
        <InputBox
          label="Description"
          placeholder="Add description here"
          className="input description" />

        <ArticleEditor />

        <div className="category-tags">
          <CategoryInput
            optionsArray={categoryOptions} />
          <TagInput
            suggestions={tagOptions} />
        </div>
        <SaveOptions />
      </div>
    );
  }
}

export default NewArticle;
