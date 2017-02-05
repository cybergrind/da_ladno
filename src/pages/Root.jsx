import React, { Component } from 'react';
//import { useQueries, createHistory } from 'history';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import DefaultView, { BlogContainer } from './blog.jsx';
import FullPost from './FullPost.jsx';
import store from './../store';


//let history = useQueries(createHistory)();

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
                    <Router history={browserHistory}>
                        {routes}
                    </Router>
                </Provider>
            </section>
        );
    }
}
