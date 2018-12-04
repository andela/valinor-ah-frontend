import React from 'react';
import Downshift from 'downshift';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13,
  semicolon: 186
};
const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.semicolon];

class NewArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      body: '',
      category: '',
      categoryOptions: [
        { id: '1', value: 'Football' },
        { id: '2', value: 'Gaming' },
        { id: '3', value: 'Programming' },
        { id: '1', value: 'Andela' },
        { id: '2', value: 'Bootcamp' },
        { id: '3', value: 'Cohort-41' },
        { id: '4', value: 'Learning' },
        { id: '5', value: 'Gaming' },
        { id: '6', value: 'Food' }
      ],
      tags: [],
      tagOptions: [
        { id: '3', text: 'Andela' },
        { id: '4', text: 'Bootcamp' },
        { id: '5', text: 'Cohort-41' },
        { id: '6', text: 'Learning' },
        { id: '7', text: 'Gaming' },
        { id: '8', text: 'Food' },
        { id: '9', text: 'Andelino' },
        { id: '10', text: 'Andrela' },
        { id: '11', text: 'Andrebaa' },
      ]
    };

    // input handler
    this.handleChange = this.handleChange.bind(this);

    // editor handler
    this.handleEditorChange = this.handleEditorChange.bind(this);

    // category handler
    this.handleCategoryChange = this.handleCategoryChange.bind(this);

    // tag handlers
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleEditorChange = (event, editor) => {
    this.setState({
      body: editor.getData()
    });
  }

  handleCategoryChange = (changes) => {
    const has = Object.prototype.hasOwnProperty;
    if (has.call(changes, 'selectedItem')) {
      this.setState({
        category: changes.selectedItem
      });
    } else if (has.call(changes, 'inputValue')) {
      this.setState({
        category: changes.inputValue
      });
    }
  }

  getSuggestions = (input, options) => (
    options.filter(categoryItem => !input || categoryItem.value.toLowerCase()
      .includes(input.toLowerCase()))
  )

  handleDelete(i) {
    const { tags } = this.state;
    // remove tag at index
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    // add the new tag
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag(tag, currPos, newPos) {
    const { tags } = this.state;
    const tagArray = [...tags];
    const newTags = tagArray.slice();

    // change tag position
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }

  render() {
    const {
      title, description, body, category, categoryOptions, tags, tagOptions
    } = this.state;

    return (
      <div className="site-content">
        <div>
          Header here
          <br />
          Header here
        </div>
        <form className="edit-article-container">
          <h3>Add a new article</h3>
          <div className="title-cell">
            <label>
              <span>Title</span>
              <input
                id="title"
                name="title"
                onChange={this.handleChange}
                value={title} placeholder="Title"
                type="text"
                autoComplete="off" />
            </label>
          </div>
          <div className="description-cell">
            <label>
              <span>Description</span>
              <input
                id="description" name="description"
                onChange={this.handleChange}
                value={description}
                placeholder="Add description here"
                type="text"
                autoComplete="off" />
            </label>
          </div>


          <div className="editor-cell">
            <CKEditor
              editor={ClassicEditor}
              data={body}
              onChange={this.handleEditorChange} />
          </div>


          <div className="categories-cell">
            <Downshift
              selectedItem={category}
              onStateChange={this.handleCategoryChange}
              >
              {({
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                getToggleButtonProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem,
                clearSelection
              }) => (
                <div>
                  <label {...getLabelProps()}>
                    <span>Category</span>
                    <div id="downshift-0-input-and-control">
                      <input
                        {...getInputProps({
                          placeholder: 'Add Category here'
                        })} />
                      {selectedItem ? (<button type="button" onClick={clearSelection}><i className="fas fa-times" /></button>)
                        : (<button type="button" {...getToggleButtonProps()}><i className="fas fa-caret-down" /></button>)}
                    </div>
                  </label>
                  <div className="category-menu-container">
                    <div
                      className="category-menu"
                      {...getMenuProps()}>
                      {isOpen
                        ? this.getSuggestions(inputValue, categoryOptions)
                          .map((categoryItem, index) => (
                            <div
                              key={categoryItem.id}
                              {...getItemProps({
                                index,
                                item: categoryItem.value,
                                className: highlightedIndex === index ? 'category-menu-item highlighted' : 'category-menu-item'
                              })}>
                              {categoryItem.value}
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              )}
            </Downshift>
          </div>


          <div className="upload-cell">
            <span>Image Upload</span>
            <div id="selected-image-container">
              <img src="https://support.hostgator.com/img/articles/weebly_image_sample.png" id="selected-image" alt="article" />
            </div>
            <button type="button" id="image-browse-button">
              <label>
                <input type="file" name="pic" accept="image/*" />
                Upload
              </label>
            </button>
          </div>

          <div className="tags-cell">
            <span id="tags-label">Tags</span>
            <ReactTags
              tags={tags}
              suggestions={tagOptions}
              handleDelete={this.handleDelete}
              handleAddition={this.handleAddition}
              handleDrag={this.handleDrag}
              delimiters={delimiters}
              inline
              placeholder="add tags here"
              classNames={{
                tags: 'tag-container',
                tagInput: 'tag-input-container',
                tagInputField: 'tag-input',
                selected: 'tag-selection',
                tag: 'tag-item',
                remove: 'tag-remove',
                suggestions: 'tag-menu-container',
                activeSuggestion: 'tag-menu-item active'
              }} />
          </div>

          <div className="save-draft-cell">
            <button type="submit" className="btn-draft">Save to draft</button>
          </div>

          <div className="save-cell">
            <button type="submit" className="btn-publish">Publish</button>
          </div>

        </form>
      </div>
    );
  }
}

export default NewArticle;
