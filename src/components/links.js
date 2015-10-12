// -*- web-mode-content-type:"jsx" -*-

import React, { Component } from 'react';
import YVideo from './youtube';
import VVideo from './vimeo';
import Imgur from './imgur';
import Coub from './coub';
import Gfycat from './gfycat';


let imgRegex = /\.(jpg|png|gif|jpeg|svg)((\?|:).+)?$/;

function classify(url){
    if (imgRegex.test(url)){
        return <img className='post_img' src={url} />;
    } else if (/(youtube|youtu).(com|be)/.test(url)){
        return <YVideo url={url} />;
    } else if (/vimeo.com/.test(url)){
        return <VVideo url={url} />;
    } else if (/^https?:\/\/(?:i.)?imgur.com/.test(url)) {
        return <Imgur url={url} />;
    } else if (/coub.com/.test(url)){
        return <Coub url={url} />;
    } else if (/gfycat.com/.test(url)){
        return <Gfycat url={url} />;
    }
    return decodeURIComponent(url);
}

export class BaseLink extends Component {
    render(){
        let url = this.props.url;
        let inner = classify(url);
        // console.log('Classify: ', inner);
        return (
            <a href={ url } target='_blank'>{ inner }</a>
        )
    }
}
