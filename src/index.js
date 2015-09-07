import 'babel-core/polyfill';

import React from 'react';
import { routes } from './app';
import { Router } from 'react-router';


// TODO: migrate to 1.0.0
// Router.run(routes, Router.HashLocation, (Root) => {
//     React.render(<Root />, document.getElementById('root'));
// })

React.render(<Router routes={routes} />, document.getElementById('root'));
