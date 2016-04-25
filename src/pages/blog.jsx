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
    is_visible(node){
        let wh = window.innerHeight;
        let sy = window.scrollY;
        let nt = node.offsetTop;
        //console.log('NT: ', nt);
        //console.log('Params: ', nt, wh, sy)
        return (nt < (wh + sy + 200));
    }
    loadNavigation(){
        const {juick_messages} = this.props;
        let lastMid = _.last(juick_messages).mid;
        return (
            <div>
                <Link to='' query={{before: lastMid}}>
                    Next Page
                </Link>
            </div>
        );
    }
    render(){
        console.log('props: ', this.props);
        const before = this.props.location.query.before || Infinity;
        if (before == Infinity){
            scrollTo(window.scrollX, 0);
        }
        let messages = _.take((this.props.juick_messages || []).filter( m => m.mid < before), 20);
        console.log('M: ', messages, ' Before: ', before);
        if (messages.length == 0){
            juick_api.load_more(before);
            return <div>Loading...</div>;
        }
        return (
            <section id='blog_content'>
                {messages.map((c) => <Post  key={'m_'+c.mid} {...c}/>) }
                {this.loadNavigation()}
            </section>
        );
    }

}

function dv_stp(state){
    return state;
}

let DefaultView = connect(dv_stp)(DefaultViewBase);

export { DefaultView };
