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

export default class Imgur extends Component {
    render(){
        let id = get_imgurid(this.props.url);
        alert('imgur')
    }
}
