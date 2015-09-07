// -*- web-mode-content-type:"jsx" -*-

import React, { Component } from 'react';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Provider, connect } from 'react-redux';
import store from '../store.js';
import juick_api from '../juick.js'


export class BlogContainer extends Component {
    get_debug(){
        console.log('NODE_ENV: ', process.env.NODE_ENV);
        if (process.env.NODE_ENV == 'development'){
            return (
                <DebugPanel top left bottom>
                    <DevTools store={store} monitor={LogMonitor} />
                </DebugPanel>
            )
        }
    }
    get_main(){
        return (
            <section id='page_section'>
                <div className='pure-g'>
                    <div className='pure-u-1-3'>
                        {this.get_debug()}
                    </div>
                    <div className='pure-u-1-3'>
                        <h1>Blog Container</h1>
                        {this.props.children}
                    </div>
                </div>
            </section>
        )
    }
    render(){
        console.log('This props+store: ', this.props, store);
        return (
            <Provider store={store}>
                {() => this.get_main()}
            </Provider>
        )
    }
}


class Post extends Component {
    render(){
        return (
            <div>
                { this.props.body }
            </div>
        )
    }
}

class DefaultViewBase extends Component {
    render(){
        console.log('JM: ', juick_api)
        return (
            <section id='blog_content'>
                <div>Default View</div>
                {juick_api.messages.map((c) => <Post {...c} />) }
            </section>
        )
    }
}

function dv_stp(state){
    return state
}

let DefaultView = connect(dv_stp)(<DefaultViewBase store={store} />);

export { DefaultView }
