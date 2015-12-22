import React, { Component } from 'react';
import { createHistory } from 'history';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

import { routes } from './routes.jsx';
import store from './../store';


let history = createHistory();


export class Root extends Component {
    render(){
        return (
            <section>
                <Provider store={store}>
                    <Router history={history}>
                        {routes}
                    </Router>
                </Provider>
            </section>
        );
    }
}
