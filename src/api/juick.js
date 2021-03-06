// -*- web-mode-content-type:"jsx" -*-
import React from 'react';
import _ from 'lodash';
import { set_state } from '../actions';
import qs from 'qs';
import { LinkWrapper } from '../components/embed_link/wrapper.jsx';

let name = 'netneladno';
let txtRe = /<?((?:https?|ftp)(?::\/\/[^\s()<>]+))>?|(\n)|(&quot;)/g;
let urlRegex = /((https?|ftp)(:\/\/[^\s()<>]+))/;


let uc = 0;
function link_prepare(s) {
    // console.log('Base link: ', s);
    uc += 1;
    return <LinkWrapper key={'_lnk_'+ uc} url={s} />;
}

function parse_substring(s) {
    if (s === '\n') {
        return (<br key={`br_${_.uniqueId()}`} />);
    } else if (s === '&quot;') {
        return (<span key={`quote_${_.uniqueId()}`}>"</span>);
    } else if (urlRegex.test(s)) {
        return link_prepare(s);
    } else if (s){
        return (<span key={`string_${_.uniqueId()}`}>{s}</span>);
    }
}

const notEmpty = (x) => x && (x.length > 0 || typeof(x) == 'object');

function prepare_body(msg) {
    let txt = msg.body;
    let arr = txt.split(txtRe);
    msg.body = arr.map(parse_substring).filter(notEmpty);
    return msg;
}


const LIMIT = 1000;

class JuickApi {
    constructor() {
        this._prev = (new Date() - 5000);
        this._in_progress = 0;
        this.name = name;
        console.log('Init juick api');
        this.last_mid = Infinity;
        this.messages = {};
        this.checkLS();
        this.load_more = this.load_more.bind(this);
        this.get_messages = this.get_messages.bind(this);
        this.load_more();

    }

    checkLS() {
        let l = localStorage.getItem('_cachev');
        if (!l) {
            localStorage.clear();
            localStorage.setItem('_cachev', Date.now());
            return;
        }
        let n = Date.now();
        if ((n - l) > 10*60*1000) {
            localStorage.clear();
            localStorage.setItem('_cachev', Date.now());
        }
    }

    async load_more(before, tag) {
        if (this._in_progress) {
            return;
        };
        console.log('Load more', JSON.stringify(this));
        this._in_progress = 1;
        let messages = await (this.get_messages(before, tag));
        messages = messages.map(prepare_body);
        this.messages[`${before}.${tag}`] = messages;
        _.defer(() => set_state('juick_messages', this.messages));
        console.log('In progress=0');
        this._in_progress = 0;
    }

    async loadFull(mid) {
        let url = `http://api.juick.com/thread?mid=${mid}`;
        let r = await fetch(url);
        if (r.status == 200) {
            let messages = await r.json();
            messages = messages.map(prepare_body);
            set_state(['full', mid], messages);
        }
    }

    async get_messages(before, tag){
        console.log('Before: ', before);
        let response = [];
        const before_mid = before || this.last_mid;
        const query = {uname: this.name};

        if (before_mid < Infinity && this.last_mid < Infinity) {
            //url = `http://api.juick.com/messages?uname=${this.name}&before_mid=${before_mid}`;
            query.before_mid = before_mid;
        }

        if (tag) {
            query.tag = tag;
        }
        let url = `http://api.juick.com/messages?${qs.stringify(query)}`;

        let local = localStorage.getItem(url);
        if (!local) {
            console.log('Push to url');
            const curr = new Date();
            const wait_time = ((this._prev || curr) -curr + LIMIT);
            console.log('Wait time: ', wait_time, this._prev, LIMIT, curr);
            const p = new Promise( resolve => {
                console.log('Wait time2: ', wait_time, this._prev);
                setTimeout(() => resolve(true), wait_time);
            });
            await p;
            this._prev = new Date();
            let reply = await fetch(url);
            console.log('reply1: ', reply);
            response = await reply.json().catch(() => []);
            console.log('Resp is1: ', response);
            //localStorage.setItem(url, JSON.stringify(response));
            console.log('Resp: ', response, this);
        } else {
            console.log('From local storage');
            response = JSON.parse(local);
        }
        if (response.length > 0) {
            this.last_mid = response[response.length-1].mid;
        }
        return response;
    }


}

let juick_api = new JuickApi();
export default juick_api;
