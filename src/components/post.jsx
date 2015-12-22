// -*- web-mode-content-type:"jsx" -*-

import React, { Component, PropTypes } from 'react'


function Datetime({timestamp}){
    let [date, time] = timestamp.split(' ');
    return (
        <div className='ts'>
            <div>{ date }</div>
            <div>{ time }</div>
        </div>
    );
}
Datetime.propTypes = {
    timestamp: PropTypes.string.isRequired
}

function Tags({tags}){
    return (
        <div className='tags'>
            {tags.map( t => {
                  return <span className='tag'>{ t }</span>
              })}
        </div>
    );
}
Tags.propTypes = {
    tags: PropTypes.array.isRequired
};

function Replies({replies, mid}){
    if (replies == 0){
        return (
            <div className='replies'>
                Replies: {replies||0}
            </div>
        );
    } else {
        return (
            <div className='replies'>
                Replies: {replies||0}
            </div>
        );
    }
}
Replies.propTypes = {
    replies: PropTypes.number.isRequired
};


export class Post extends Component {
    render(){
        return (
            <div className='post'>
                <Datetime {...this.props}/>
                <Tags tags={this.props.tags||[]}/>
                <div className='body'>
                    {this.props.body}
                </div>
                <Replies replies={this.props.replies||0} mid={this.props.mid}/>
            </div>
        )
    }
}
Post.propTypes = {
    body: PropTypes.array.isRequired,
    timestamp: PropTypes.string.isRequired,
    mid: PropTypes.number.isRequired,
    replies: PropTypes.number,
    tags: PropTypes.array,
}
