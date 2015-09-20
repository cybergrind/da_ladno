// -*- web-mode-content-type:"jsx" -*-

import React, { Component } from 'react'
import { BaseLink } from './links'

let urlRegex = /(https?|ftp)(:\/\/[^\s()<>]+)/g;
let pat = '<<<!>>>'

export class Post extends Component {
    get_ts(){
        let [date, time] = this.props.timestamp.split(' ')
        return (
            <div className='ts'>
                <div>{ date }</div>
                <div>{ time }</div>
            </div>
        )
    }
    replace_url(url){
        return <BaseLink url={url}/>;
    }
    txt_escape(txt){
        let u = txt.split('\n');
        let l = u.length - 1;
        u = u.reduce( (acc, s, i) => {
            if (s.length == 0){
                acc.push(<br/>);
            } else if (i != l) {
                acc.push(s);
                acc.push(<br/>);
            } else {
                acc.push(s);
            }
            return acc;
        }, []);
        return u;
    }
    get_body(){
        let txt = this.props.body
        let urls = []
        let m = txt.match(urlRegex);
        if (m){
            urls = m.map(this.replace_url);
        }
        let body = txt.replace(urlRegex, u => pat).split(pat).map( s => this.txt_escape(s))
        console.log('Body: ', body, txt);
        return (
            <div className='body'>
                { body }
                { urls }
            </div>
        )
    }
    render(){
        return (
            <div className='post'>
                { this.get_ts() }
                <div className='tags'>
                    { this.props.tags.map( t => {
                        return <span className='tag'>{ t }</span>
                    }) }
                </div>
                { this.get_body() }
            </div>
        )
    }
}
