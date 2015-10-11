// -*- web-mode-content-type:"jsx" -*-
import React, { Component } from 'react';
import loadScript from 'load-script';

// <iframe src="http://gfycat.com/ifr/DismalDistortedBird" frameborder="0" scrolling="no" width="480" height="858" style="-webkit-backface-visibility: hidden;-webkit-transform: scale(1);" ></iframe>


function get_id(url){
    let r = /gfycat.com\/([^?\/]+)/;
    if (r.test(url)){
        let i = url.match(r)[1];
        return i;
    } else {
        return '';
    }
}

let params = {
    frameborder: '0',
    scrolling: 'no',
    width: '480',
    height: "858",
    style: {
        '-webkit-backface-visibility': 'hidden',
        '-webkit-transform': 'scale(1)'
    }
}

let init = false;
export default class Gfycat extends Component {
    componentDidMount(){
        loadScript('http://test.gfycat.com/gfycat_test_june25.js');
        if (gfyCollection && !init){
            gfyCollection.init();
            init = true;
        }
    }
    render(){
        let id = get_id(this.props.url);
        return (
            <div className="gfyitem" data-id={id} />
        );
        return (
            <iframe src={`http://gfycat.com/ifr/${id}`} {...params}></iframe>
        );
    }
}
