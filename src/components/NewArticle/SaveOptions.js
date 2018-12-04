import React from 'react';

import Button from './Button';

const SaveOptions = () => (
  <div className="save-options">
    <Button label="Save as Draft" className="button secondary" />
    <Button label="Publish" className="button primary" />
  </div>
);

export default SaveOptions;
