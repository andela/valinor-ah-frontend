import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'react-autocomplete';

class AutocompleteInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render() {
    const { value } = this.state;
    const { optionsArray } = this.props;

    return (
      <div className="input category">
        <span>Category</span>
        <AutoComplete
          getItemValue={item => item.label}
          items={optionsArray}
          shouldItemRender={
            (item, currentValue) => (
              item.label.toLowerCase()
                .indexOf(currentValue.toLowerCase()) > -1
                && currentValue.length > 0
            )
          }
          renderItem={(item, isHighlighted) => (
            <div style={{
              fontSize: 16,
              padding: 6,
              background: isHighlighted ? 'lightgray' : 'white'
            }}>
              {item.label}
            </div>
          )}
          value={value}
          onChange={(event) => {
            this.setState({
              value: event.target.value
            });
          }}
          onSelect={(selected) => {
            this.setState({
              value: selected
            });
          }}
        />
      </div>
    );
  }
}

AutocompleteInput.propTypes = {
  optionsArray: PropTypes.array.isRequired,
};

export default AutocompleteInput;
