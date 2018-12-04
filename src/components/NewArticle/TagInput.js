import React from 'react';
import PropTypes from 'prop-types';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class TagInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [
        { id: 'Celebration', text: 'Celebration' },
        { id: 'Pets', text: 'Pets' }
      ]
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag(tag, currPos, newPos) {
    const { tags } = this.state;
    const tagArray = [...tags];
    const newTags = tagArray.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }

  render() {
    const { tags } = this.state;
    const { suggestions } = this.props;
    return (
      <div className="input tags">
        <span>Tags</span>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
          delimiters={delimiters}
          placeholder="add a new tag here" />
      </div>
    );
  }
}

TagInput.propTypes = {
  suggestions: PropTypes.array.isRequired
};

export default TagInput;
