// -*- web-mode-content-type:"jsx" -*-

import React, { Component } from 'react';
import { Route } from 'react-router';
import { BlogContainer, DefaultView } from './blog.jsx';
import { FullPost } from './full_post.jsx';


class NotFound extends Component {
    render() {
        return (
            <div>404 - Not Found</div>
        );
    }
}

export var routes = (
    <Route component={BlogContainer}>
        <Route path='/' component={DefaultView} />
        <Route path='/msg/' component={FullPost} />
        <Route path='*' component={NotFound} />
    </Route>
);
