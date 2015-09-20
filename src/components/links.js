// -*- web-mode-content-type:"jsx" -*-

import React, { Component } from 'react';


export class BaseLink extends Component {
    render(){
        let url = this.props.url;
        return (
            <a href={ url } target='_blank'>{ url }</a>
        )
    }
}
