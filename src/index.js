import 'babel-core/polyfill';

import React from 'react';
import { routes } from './app';
import { Router } from 'react-router';
import { createHistory } from 'history';
import { Provider } from 'react-redux';
import store from './store'


let history = createHistory();

function getRouter(){
    return (
        <Router history={history}>
            { routes }
        </Router>
    )
}

let Root = React.createClass({
    render: function(){
        return (
            <section>
                <Provider store={store}>{getRouter}</Provider>
            </section>
        );
    }
});

React.render(<Root />, document.getElementById('root'));
