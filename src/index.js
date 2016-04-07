import '../scss/styles.scss';
import 'babel-core/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';


function draw(){
    const Root = require('./pages/Root.jsx').Root;
    ReactDOM.render(React.createElement(Root), document.getElementById('root'));
}

draw();

if (module.hot){
    module.hot.accept('./pages/Root.jsx');
}
