import '../scss/styles.scss';
import 'babel-core/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { Root } from './components/root.jsx';



ReactDOM.render(React.createElement(Root), document.getElementById('root'));
