import React from 'react';
import Downshift from 'downshift';
import PropTypes from 'prop-types';

import ReactQuill from 'react-quill';

import { WithContext as ReactTags } from 'react-tag-input';
import { sampleCategoryOptions, sampleTagOptions } from '../../../mockdata/samplebody';

const KeyCodes = {
  comma: 188,
  enter: 13,
  semicolon: 186
};
const delimiters = Object.values(KeyCodes);

export const getSuggestions = (input, options) => (
  options.filter(categoryItem => !input || categoryItem.value.toLowerCase()
    .includes(input.toLowerCase()))
);

/**
 * Category dropdown component
 * @param {object} props
 */
export const CategoryDropdown = (props) => {
  const { category, onCategoryChange, categoryOptions } = props;
  return (
    <Downshift
      selectedItem={category}
      onStateChange={onCategoryChange}
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
                ? getSuggestions(inputValue, categoryOptions)
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
  );
};


/**
 * Rich Text Editor component
 * @param {object} props - contains body and changeHandler
 */
export const TextEditor = (props) => {
  const { body, onEditorChange } = props;
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML
      matchVisual: false,
    }
  };

  const quillFormats = [
    'header',
    'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'color', 'background',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
  ];

  return (
    <ReactQuill
      theme="snow"
      onChange={onEditorChange}
      value={body}
      modules={quillModules}
      formats={quillFormats}
      bounds=".editor-cell"
      placeholder="Add your article here"
    />
  );
};

TextEditor.propTypes = {
  body: PropTypes.string.isRequired,
  onEditorChange: PropTypes.func.isRequired
};


/**
 * Article page component
 */
class NewArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      body: '',
      category: '',
      categoryOptions: sampleCategoryOptions,
      tags: [],
      tagOptions: sampleTagOptions
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

  handleEditorChange = (html) => {
    this.setState({
      body: html
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
        <form className="edit-article-container">
          <h3>Add a new article</h3>
          <div className="title-cell">
            <label>
              <span>Title</span>
              <input
                id="title"
                name="title"
                className="title-input"
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
            <TextEditor body={body} onEditorChange={this.handleEditorChange} />
          </div>

          <div className="categories-cell">
            <CategoryDropdown
              category={category}
              categoryOptions={categoryOptions}
              onCategoryChange={this.handleCategoryChange} />
          </div>

          <div className="upload-cell">
            <span>Image Upload</span>
            <div id="selected-image-container" />
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
            <button type="submit" className="btn-draft"><span>Save to draft</span></button>
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
