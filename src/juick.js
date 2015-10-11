// -*- web-mode-content-type:"jsx" -*-
import React from 'react'
import { set_state } from './actions'
import { BaseLink } from './components/links'

let name = 'netneladno'
let txtRe = /<?((?:https?|ftp)(?::\/\/[^\s()<>]+))>?|(\n)|(&quot;)/g;
let urlRegex = /((https?|ftp)(:\/\/[^\s()<>]+))/;



function link_prepare(s){
    // console.log('Base link: ', s);
    return <BaseLink url={s} />;
}

function parse_substring(s){
    if (s === '\n'){
        return <br/>;
    } else if (s === '&quot;'){
        return '"';
    } else if (urlRegex.test(s)){
        return link_prepare(s);
    } else {
        return s;
    }
}

function prepare_body(msg){
    let txt = msg.body;
    let arr = txt.split(txtRe);
    msg.body = arr.map(parse_substring);
    return msg
}

class JuickApi {
    constructor(){
        this.name = name;
        console.log('Init juick api');
        this.page = 1;
        this.messages = [];
        this.checkLS();
        this.load_more();
        this._in_progress = 0;
    }
    checkLS(){
        let l = localStorage.getItem('_cachev');
        if (!l){
            localStorage.clear();
            localStorage.setItem('_cachev', Date.now());
            return
        }
        let n = Date.now();
        if ((n - l) > 10*60*1000){
            localStorage.clear();
            localStorage.setItem('_cachev', Date.now());
        }
    }
    async load_more(){
        if (this._in_progress){
            return
        };
        this._in_progress = 1;
        let response = await (this.get_messages());
        this.push_messages(response);
        set_state('juick_messages', this.messages);
        this._in_progress = 0;
    }

    push_messages(messages){
        console.log('Mesasges: ', messages, this);
        messages = messages.map(prepare_body)
        this.messages = [...this.messages, ...messages];
        console.log('M: ', this);
    }

    async get_messages(){
        this.page += 1;
        let response = [];
        let url = `http://api.juick.com/messages?uname=${this.name}&page=${this.page-1}`;
        let local = localStorage.getItem(url);
        if (!local){
            console.log('Push to url');
            let reply = await fetch(url);
            console.log('reply1: ', reply);
            response = await reply.json().catch(e => []);
            console.log('Resp is1: ', response)
            //localStorage.setItem(url, JSON.stringify(response));
            console.log('Resp: ', response, this);
        } else {
            console.log('From local storage')
            response = JSON.parse(local);
        }
        return response
    }


}

let juick_api = new JuickApi()
export default juick_api
