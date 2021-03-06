// -*- web-mode-content-type:"jsx" -*-

import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import store from '../store';
import juick_api from '../api/juick.js';
import { Post } from './Post.jsx';
//import { DevTools } from '../components/devtools.jsx';
import { getTitle } from '../title.js';


export function BlogContainer({children}) {
    return (
        <div className="page">
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

class DefaultView extends Component {
    is_visible(node) {
        const wh = window.innerHeight;
        const sy = window.scrollY;
        const nt = node.offsetTop;

        return (nt < (wh + sy + 200));
    }
    loadNavigation(){
        return (
            <div>
                <Link to='' query={this.nextQuery}>
                    Next Page
                </Link>
            </div>
        );
    }

    nextPage = _.throttle(() => {
        console.log('Next page check');
        console.log(`${window.innerHeight} ${window.scrollY} ${document.body.offsetHeight}`);
        if ((window.innerHeight + window.scrollY + 5) >= document.body.offsetHeight){
            console.log('Next page go ', this.lastMid);
            console.log(this);
            this.props.router.push({pathname: '', query: this.nextQuery});
        }
    }, 500);

    onKeyPress = (evt) => {
        console.log('EVT: ', evt);
        const listen = [' ', 'Enter', 'PageDown', 'ArrowRight', 'End', 'Space'];
        if (listen.indexOf(evt.key) >= 0 || listen.indexOf(evt.code >= 0)){
            this.nextPage();
        }
    }

    componentDidMount(){
        window.addEventListener('keyup', this.onKeyPress, false);
    }
    componentWillUnmount(){
        window.removeEventListener('keyup', this.onKeyPress);
    }

    render(){
        console.log('props: ', this.props);
        const {location, messages} = this.props;
        const query = location.query
        const before = query.before || Infinity;
        const tag = query.tag || null;
        if (before == Infinity) {
            scrollTo(window.scrollX, 0);
        }
        console.log('M: ', messages, ' Before: ', before);
        if (!messages.length){
            juick_api.load_more(before, tag);
            return <div>Loading...</div>;
        }
        this.messages = messages;

        this.lastMid = _.last(messages).mid;
        this.nextQuery = {before: this.lastMid};
        if (tag){
            this.nextQuery.tag = tag;
        }
        return (
            <div className="content">
                {messages.map(props => (<Post key={'m_' + props.mid} {...props} location={location}/>))}
                {this.loadNavigation()}
            </div>
        );
    }

}

function dv_stp(state, other){
    console.log('New state dvstp ', other);
    const before = other.location.query.before || Infinity;
    const tag = other.location.query.tag || null;
    return {messages: state.juick_messages[`${before}.${tag}`] || []};
}


export default connect(dv_stp)(DefaultView);
