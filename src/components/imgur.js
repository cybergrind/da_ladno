// -*- web-mode-content-type:"jsx" -*-
import React, { Component } from 'react';
import loadScript from 'load-script';

// <blockquote class="imgur-embed-pub" lang="en" data-id="2GuAESk">
// <a href="//imgur.com/2GuAESk"> If this gets to front page I will draw a ton of imgur doodles for you guys</a>
// </blockquote>
// <script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>


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

let loaded = 0;

export default class Imgur extends Component {
    componentDidMount(){
        if (!loaded){
            loadScript('http://s.imgur.com/min/embed.js');
        }
        loaded = 1;
    }
    render(){
        let id = get_imgurid(this.props.url);
        return (
            <div>
                <blockquote className="imgur-embed-pub" lang="en" data-id={id}>
                </blockquote>
            </div>

        );
    }
}
