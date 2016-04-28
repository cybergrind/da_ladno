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


export class BlogContainer extends Component {
    render(){
        return (
            <section id='page_section'>
                {DevTools && <DevTools />}
                <div className='pure-g'>
                    <div className='pure-u-4-24'/>
                    <div className='pure-u-16-24' id='main_container'>
                        <h1>
                            <Link to=''>
                                {BlogContainer.title}
                            </Link>
                        </h1>
                        {this.props.children}
                    </div>
                </div>
            </section>
        );
    }
}
BlogContainer.title = getTitle();

// { mid: 2802690, user: Object, body: "", tags: Array[1],
//   timestamp: "2015-09-12 18:35:23", replies: 1, repliesby: "@a, @b" }

class DefaultViewBase extends Component {
    constructor(props, context){
        super(props, context);
        this.context = context;
    }

    is_visible(node){
        let wh = window.innerHeight;
        let sy = window.scrollY;
        let nt = node.offsetTop;
        //console.log('NT: ', nt);
        //console.log('Params: ', nt, wh, sy)
        return (nt < (wh + sy + 200));
    }
    loadNavigation(){
        return (
            <div>
                <Link to='' query={{before: this.lastMid}}>
                    Next Page
                </Link>
            </div>
        );
    }

    nextPage = _.throttle(() => {
        console.log('Next page check');
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
            console.log('Next page go ', this.lastMid);
            this.props.history.push({pathname: '', query: {before: this.lastMid}});
        }
    }, 500)

    onKeyPress = (evt) => {
        if ([' ', 'Enter', 'PageDown', 'ArrowRight', 'End'].indexOf(evt.key) >= 0){
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
        const before = this.props.location.query.before || Infinity;
        if (before == Infinity){
            scrollTo(window.scrollX, 0);
        }
        let {messages} = this.props;
        console.log('M: ', messages, ' Before: ', before);
        if (messages.length == 0){
            juick_api.load_more(before);
            return <div>Loading...</div>;
        }
        this.messages = messages;
        this.lastMid = _.last(messages).mid;
        return (
            <section id='blog_content'>
                {messages.map((c) => <Post  key={'m_'+c.mid} {...c}/>) }
                {this.loadNavigation()}
            </section>
        );
    }

}

function dv_stp(state, other){
    console.log('New state dvstp ', other);
    const before = other.location.query.before || Infinity;
    return {messages: state.juick_messages[before] || []};
}

let DefaultView = connect(dv_stp)(DefaultViewBase);


export { DefaultView };
