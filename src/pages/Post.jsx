// -*- web-mode-content-type:"jsx" -*-

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';


function Replies({replies, mid}){
    return (
        <Link to='/msg/' query={{mid}} className="post__replies">
            Replies: {replies || 0}
        </Link>
    );
}
Replies.propTypes = {
    replies: PropTypes.number.isRequired
};


export class Post extends Component {
    drawPhoto(){
        const {photo} = this.props;
        if (photo){
            return (
                <img src={photo.medium || photo.small} className="post__photo" />
            );
        }
    }

    render(){
        let { timestamp, tags } = this.props;
        let [date, time] = timestamp.split(' ');
        return (
            <div className="post">
                <div className="post__tags">
                    {tags.map( t => <span key={t+_.uniqueId()} className="post__tag">{t}</span>)}
                </div>
                <div className="post__body">
                    {this.props.body}
                </div>
                {this.drawPhoto()}
                <div className="post__meta">
                    <div className="post__timestamp">
                        <div>{time}, {date}</div>
                    </div>
                    <div className="post__replies">
                        {this.props.showReplies && <Replies replies={this.props.replies||0} mid={this.props.mid} />}
                    </div>
                </div>
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
    photo: PropTypes.object,
};
Post.defaultProps = {
    tags: [],
    replies: 0,
    showReplies: true
};
