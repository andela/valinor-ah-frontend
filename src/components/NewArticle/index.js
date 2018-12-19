import React from 'react';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { WithContext as ReactTags } from 'react-tag-input';
import { fetchCategoryTitles } from '../../actions/categoryActions';
import { fetchTagTitles } from '../../actions/tagActions';
import { postArticle } from '../../actions/postArticleActions';

const KeyCodes = {
  comma: 188,
  enter: 13,
  semicolon: 186
};
const delimiters = Object.values(KeyCodes);

export const getSuggestions = (input, options) => (
  options.filter(categoryItem => !input || categoryItem.categoryName.toLowerCase()
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
                        item: categoryItem.categoryName,
                        className: highlightedIndex === index ? 'category-menu-item highlighted' : 'category-menu-item'
                      })}>
                      {categoryItem.categoryName}
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

/**
 * Article page component
 */
export class NewArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      body: '',
      articleImage: '',
      category: '',
      tags: [],
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

    // upload handler
    this.handleUpload = this.handleUpload.bind(this);

    // submit handler
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { requestCategoryTitles, requestTagTitles } = this.props;
    // fetch categories
    requestCategoryTitles();
    // fetch tags
    requestTagTitles();
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

  handleSubmit(e) {
    const { requestPostArticle, history } = this.props;
    const {
      title, description, body, articleImage, category, tags
    } = this.state;
    const tagsArray = tags.map(tag => tag.text);
    const featuredImage = articleImage.trim().length === 0 ? undefined : articleImage;
    const status = e.target.className === 'btn-publish' ? 'publish' : 'draft';

    const postBody = {
      title,
      description,
      body,
      articleImage: featuredImage,
      categoryName: category,
      tagsArray,
      status,
    };
    requestPostArticle(postBody, history);
  }

  handleUpload() {
    cloudinary.openUploadWidget( // eslint-disable-line no-undef
      {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.CLOUDINARY_ARTICLE_PRESET,
        multiple: false,
        maxFiles: 1,
        cropping: true,
      },
      (error, result) => {
        if (result.event === 'success') {
          this.setState({
            articleImage: result.info.secure_url
          });
          const thumbnailContainer = document.getElementById('selected-image-container');
          thumbnailContainer.style.backgroundImage = `url(${result.info.secure_url})`;
        }
      }
    );
  }

  render() {
    const {
      title, description, body, category, tags
    } = this.state;
    const {
      categoryOptions, tagOptions, isLoggedIn, errors
    } = this.props;

    // modify the tag options objects to be able to work with reacttags
    tagOptions.forEach((tagObject) => {
      tagObject.text = tagObject.tagName;
      tagObject.id = String(tagObject.id);
    });

    if (!isLoggedIn) {
      return (<Redirect to="/signup" />);
    }

    return (
      <div className="site-content">
        <form className="edit-article-container">
          <h3>Add a new article</h3>
          <div className="title-cell">
            <label>
              <div className="label-error">
                <span>Title</span>
                <i>{errors.title}</i>
              </div>
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
              <div className="label-error">
                <span>Description</span>
                <i>{errors.description}</i>
              </div>
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
            <div className="label-error">
              <i>{errors.body}</i>
            </div>
            <TextEditor body={body} onEditorChange={this.handleEditorChange} />
          </div>

          <div className="categories-cell">
            <CategoryDropdown
              category={category}
              categoryOptions={categoryOptions}
              onCategoryChange={this.handleCategoryChange} />
          </div>

          <div className="upload-cell">
            <span>Featured Image</span>
            <div id="selected-image-container" />
            <button type="button" onClick={this.handleUpload} id="image-browse-button">
              Upload
            </button>
          </div>

          <div className="tags-cell">
            <div className="label-error">
              <i>{errors.tags}</i>
            </div>
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
            <button type="button" onClick={this.handleSubmit} className="btn-draft"><span>Save to draft</span></button>
          </div>

          <div className="save-cell">
            <button type="button" onClick={this.handleSubmit} className="btn-publish">Publish</button>
          </div>

        </form>
      </div>
    );
  }
}

TextEditor.propTypes = {
  body: PropTypes.string.isRequired,
  onEditorChange: PropTypes.func.isRequired
};

NewArticle.propTypes = {
  requestCategoryTitles: PropTypes.func.isRequired,
  categoryOptions: PropTypes.array.isRequired,
  requestTagTitles: PropTypes.func.isRequired,
  tagOptions: PropTypes.array.isRequired,
  requestPostArticle: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

NewArticle.defaultProps = {
  errors: {}
};

const mapStateToProps = state => ({
  categoryOptions: state.categoryTitles,
  tagOptions: state.tagTitles,
  isLoggedIn: state.global.isLoggedIn,
  errors: state.postArticle.errors,
});

const mapActionsToProps = {
  requestCategoryTitles: fetchCategoryTitles,
  requestTagTitles: fetchTagTitles,
  requestPostArticle: postArticle,
};

export default connect(mapStateToProps, mapActionsToProps)(NewArticle);
