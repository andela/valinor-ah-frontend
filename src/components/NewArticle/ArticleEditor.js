import React from 'react';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-balloon';

const ArticleEditor = () => (
  <div className="editor">
    <CKEditor
      editor={ClassicEditor} />
  </div>
);

export default ArticleEditor;
