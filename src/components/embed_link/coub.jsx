// -*- web-mode-content-type:"jsx" -*-
import React, { Component } from 'react';
import qs from 'qs';


function get_coub(url){
    let r = /coub.com\/view\/([^?\/]+)/;
    if (r.test(url)){
        var i = url.match(r)[1];
        return i;
    } else {
        return '';
    }
}

// <iframe src="//coub.com/embed/8hf1i?muted=false&autostart=false&originalSize=false&hideTopBar=false&startWithHD=false" allowfullscreen="true" frameborder="0" width="640" height="360"></iframe>

let params = {
    muted: false,
    autostart: false,
    originalSize: false,
    hideTopBar: false,
    startWithHD: false
};
export default class Coub extends Component {
    render(){
        let id = get_coub(this.props.url);
        let src = `//coub.com/embed/${id}?${qs.stringify(params)}`;
        return (
            <iframe src={src} allowFullScreen='true' frameBorder='0' width='640' height='360' />
        );
    }
}
