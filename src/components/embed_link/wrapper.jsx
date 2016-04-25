// -*- web-mode-content-type:"jsx" -*-

import React, { Component, PropTypes } from 'react';
import YVideo from './youtube.jsx';
import VVideo from './vimeo.jsx';
import Imgur from './imgur.jsx';
import Coub from './coub.jsx';
import Gfycat from './gfycat.jsx';


let imgRegex = /\.(jpg|png|gif|jpeg|svg)((\?|:).+)?$/;

function classify(url){
    if (imgRegex.test(url)){
        return [<img className='post_img' src={url} />];
    } else if (/(youtube|youtu).(com|be)/.test(url)){
        return [<YVideo url={url} />];
    } else if (/vimeo.com/.test(url)){
        return [<VVideo url={url} />];
    } else if (/^https?:\/\/(?:i.)?imgur.com/.test(url)) {
        return [<Imgur url={url} />];
    } else if (/coub.com/.test(url)){
        return [<Coub url={url} />];
    } else if (/gfycat.com/.test(url)){
        return [<Gfycat url={url} />];
    } else if (/\.mp4(\?.*)?$/.test(url)){
        return [<Mp4Video url={url}/>, true];
    } else if (/\.webm(\?.*)?$/.test(url)){
        return [<WebmVideo url={url}/>, true];
    }
    return [decodeURIComponent(url)];
}

class Mp4Video extends Component {
    render(){
        return (
            <video width='800' controls='1' loop='1'>
                <source src={this.props.url} type='video/mp4'/>
            </video>
        );
    }
}

class WebmVideo extends Component {
    render(){
        return (
            <video width='800' controls='1' loop='1'>
                <source src={this.props.url} type='video/webm'/>
            </video>
        );
    }
}

export class LinkWrapper extends Component {
    render(){
        let url = this.props.url;
        let [inner, noLink] = classify(url);
        // console.log('Classify: ', inner);
        if (noLink){
            return inner;
        }
        return <a href={url} target='_blank'>{inner}</a>;
    }
}
LinkWrapper.propTypes = {
    url: PropTypes.string.isRequired,
};
