// -*- web-mode-content-type:"jsx" -*-

import React, { Component } from 'react';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { connect } from 'react-redux';
import store from '../store.js';
import juick_api from '../juick.js'
import { Post } from './post.jsx'


export class BlogContainer extends Component {
    get_debug(){
        if (process.env.NODE_ENV == 'development'){
            return (
                <DebugPanel top left bottom>
                    <DevTools store={store} monitor={LogMonitor} />
                </DebugPanel>
            )
        }
    }
    render(){
        return (
            <section id='page_section'>
                <div className='pure-g'>
                    <div className='pure-u-1-3'>
                        {this.get_debug()}
                    </div>
                    <div className='pure-u-2-3' id='main_container'>
                        <h1>Container</h1>
                        {this.props.children}
                    </div>
                </div>
            </section>
        )
    }
}

// { mid: 2802690, user: Object, body: "", tags: Array[1],
//   timestamp: "2015-09-12 18:35:23", replies: 1, repliesby: "@a, @b" }

class LoadMore extends Component {
    render(){
        return (
            <div>
                Loading more....
            </div>
        )
    }
}

class DefaultViewBase extends Component {
    is_visible(node){
        let wh = window.innerHeight;
        let sy = window.scrollY;
        let nt = node.offsetTop;
        //console.log('NT: ', nt);
        //console.log('Params: ', nt, wh, sy)
        return (nt < (wh + sy + 200));
    }
    more(){
        // console.log('Load more');
        let n = React.findDOMNode(this.refs.elm);
        if (this.is_visible(n)){
            console.log('Load more..');
            juick_api.load_more().catch(e => 'ok');
            setTimeout(this.more.bind(this), 100);
        } else {
            // console.log('Not visible');
        }
    }
    key_down(e){
        console.log('KD: ', e);
        if (e.keyCode == 32){
            this.more()
        }
    }
    componentDidMount(){
        this.more();
        window.more = this.more.bind(this);
        document.addEventListener('keyup', this.more.bind(this))
    }
    componentWillUnmount(){
        document.removeEventListener('keyup', this.more.bind(this))
    }
    render(){
        let messages = this.props.juick_messages || [];
        return (
            <section id='blog_content' onWheel={this.more.bind(this)}>
                <h3>Default View</h3>
                {messages.map((c) => <Post {...c} key={'m_'+c.mid}/>) }
                <LoadMore ref='elm'/>
            </section>
        )
    }
}

function dv_stp(state){
    return state
}

let DefaultView = connect(dv_stp)(DefaultViewBase);

export { DefaultView }
