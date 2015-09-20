// -*- web-mode-content-type:"jsx" -*-
import React, { Component } from 'react';

function get_imgurid(url){
  console.log(url);
    var r = /imgur.com\/(?:gallery\/)?(?:a\/)?(\w+)(?:\..+)?/;
  if (r.test(url)) {
    var i = url.match(r)[1];
    if (i.length >= 7){
      return i;
    } else {
      return 'a/'+i;
    }
  } else {
    return ''
  }
}

export default class VVideo extends Component {
    get_iframe_url(id){
        return `//player.vimeo.com/video/${id}`
    }
    render(){
        let id = get_imgurid(this.props.url);
        let s = {width: '800', height: '490', frameBorder: '0'}
        return <iframe src={this.get_iframe_url(id)} {...s} allowfullscreen/>;
    }
}
