import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/styles/index.scss';
import { store } from './store/store';

import App from './App';

render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
