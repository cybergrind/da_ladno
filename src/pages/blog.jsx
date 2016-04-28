// -*- web-mode-content-type:"jsx" -*-

import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import store from '../store';
import juick_api from '../api/juick.js';
import { Post } from './Post.jsx';
import { DevTools } from '../components/devtools.jsx';
import { getTitle } from '../title.js';


export function BlogContainer({children}) {
    return (
        <div className="page">
            {DevTools && <DevTools />}
            <div className="page__wrapper">
                <h1 className="page__header">
                    <Link to='' className="page__header-link">
                        {BlogContainer.title}
                    </Link>
                </h1>
                <div className="page__content">
                    {children}
                </div>
                <div className="footer">
                    Netneladno &copy; 2016
                </div>
            </div>
        </div>
    );
}

BlogContainer.title = getTitle();

// { mid: 2802690, user: Object, body: "", tags: Array[1],
//   timestamp: "2015-09-12 18:35:23", replies: 1, repliesby: "@a, @b" }

const emptyArray = [];
class DefaultView extends Component {
    is_visible(node) {
        const wh = window.innerHeight;
        const sy = window.scrollY;
        const nt = node.offsetTop;

        return (nt < (wh + sy + 200));
    }

    loadNavigation() {
        const before = _.last(this.props.juick_messages).mid;
        return (
            <div>
                <Link to='' query={{before}}>
                    Next Page
                </Link>
            </div>
        );
    }

    render() {
        const before = this.props.location.query.before || Infinity;
        if (before == Infinity) {
            scrollTo(window.scrollX, 0);
        }

        const messages = _.take((this.props.juick_messages || emptyArray).filter(m => m.mid < before), 20);

        if (!messages.length) {
            juick_api.load_more(before);
            return <div>Loading...</div>;
        }

        return (
            <div className="content">
                {messages.map(props => (<Post key={'m_' + props.mid} {...props} />))}
                {this.loadNavigation()}
            </div>
        );
    }

}

export default connect(state => state)(DefaultView);
