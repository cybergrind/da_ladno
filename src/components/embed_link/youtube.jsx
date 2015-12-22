// -*- web-mode-content-type:"jsx" -*-
import React, { Component } from 'react';


function get_youtubeid(url){
  if (url.indexOf('youtube.com') >= 0){
    var video_id = url.split('v=')[1];

  } else if (url.indexOf('youtu.be') >= 0) {
    var s = url.split('/');
    var video_id = s[s.length-1];
  }
  if (!video_id){ return; };
  var ampersandPosition = video_id.indexOf('&');
  if(ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
  }
  return video_id;
}


export default class YVideo extends Component {
    get_iframe_url(id){
        return `//youtube.com/embed/${id}?autoplay=0`;
    }
    render(){
        let id = get_youtubeid(this.props.url);
        let s = {width: '800', height: '490', frameBorder: '0'};
        return <iframe src={this.get_iframe_url(id)} {...s} allowFullScreen />;
    }
}
