// -*- web-mode-content-type:"jsx" -*-

import React, { Component } from 'react';
import { Route } from 'react-router';
import { BlogContainer, DefaultView } from './components/blog.js';


class NotFound extends Component {
    render() {
        return (
            <div>404 - Not Found</div>
        )
    }
}

export var routes = (
    <Route component={BlogContainer}>
        <Route path='/' component={DefaultView} />
        <Route path='*' component={NotFound} />
    </Route>
)
