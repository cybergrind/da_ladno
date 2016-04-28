import React, { Component } from 'react';
import { createHistory } from 'history';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';

import DefaultView, { BlogContainer } from './blog.jsx';
import FullPost from './FullPost.jsx';
import store from './../store';


let history = createHistory();

class NotFound extends Component {
    render() {
        return (
            <div>404 - Not Found</div>
        );
    }
}

const routes = (
    <Route component={BlogContainer}>
        <Route path='/' component={DefaultView} />
        <Route path='/msg/' component={FullPost} />
        <Route path='*' component={NotFound} />
    </Route>
);



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
