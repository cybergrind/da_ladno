// -*- web-mode-content-type:"jsx" -*-

import React, { Component } from 'react'


export class Post extends Component {
    get_ts(){
        let [date, time] = this.props.timestamp.split(' ')
        return (
            <div className='ts'>
                <div>{ date }</div>
                <div>{ time }</div>
            </div>
        )
    }
    get_body(){
        return (
            <div className='body'>
                { this.props.body }
            </div>
        )
    }
    render(){
        let tags = this.props.tags || [];
        return (
            <div className='post'>
                { this.get_ts() }
                <div className='tags'>
                    { tags.map( t => {
                        return <span className='tag'>{ t }</span>
                    }) }
                </div>
                { this.get_body() }
            </div>
        )
    }
}
