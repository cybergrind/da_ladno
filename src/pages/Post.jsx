// -*- web-mode-content-type:"jsx" -*-

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


function Replies({replies, mid}){
    return (
        <div className='replies'>
            <Link to='/msg/' query={{mid}}>
                Replies: {replies||0}
            </Link>
        </div>
    );
}
Replies.propTypes = {
    replies: PropTypes.number.isRequired
};


export class Post extends Component {
    render(){
        let { timestamp, tags } = this.props;
        let [date, time] = timestamp.split(' ');
        return (
            <div className='post'>
                <div className='ts'>
                    <div>{date}</div>
                    <div>{time}</div>
                </div>
                <div className='tags'>
                    {tags.map( t => <span key={t} className='tag'>{t}</span>)}
                </div>
                <div className='body'>
                    {this.props.body}
                </div>
                {this.props.showReplies && <Replies replies={this.props.replies||0} mid={this.props.mid}/>}
            </div>
        );
    }
}
Post.propTypes = {
    body: PropTypes.array.isRequired,
    timestamp: PropTypes.string.isRequired,
    mid: PropTypes.number.isRequired,
    replies: PropTypes.number.isRequired,
    tags: PropTypes.array.isRequired,
    showReplies: PropTypes.bool.isRequired,
};
Post.defaultProps = {
    tags: [],
    replies: 0,
    showReplies: true
};
