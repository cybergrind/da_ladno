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


class Tag extends Component {
    render(){
        const {tag, location} = this.props;
        const before = ((location || {}).query || {}).before || Infinity;
        const query = {before, tag};
        return <Link className="post__tag" to='' query={query}>{tag}</Link>;
    }
}
Tag.propTypes = {
    tag: PropTypes.string.isRequired,
    location: PropTypes.object
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
        console.log('PROPSS: ', this.props);
        const {timestamp, tags, location} = this.props;
        const [date, time] = timestamp.split(' ');
        return (
            <div className="post">
                <div className="post__tags">
                    {tags.map(t => <Tag key={`tag_${_.uniqueId()}`} tag={t} location={location}/>)}
                </div>
                <div className="post__body">
                    {this.props.body}
                </div>
                {this.drawPhoto()}
                <div className="post__meta">
                    <span className="post__timestamp">
                        <span>{time}, {date}</span>
                    </span>
                    {' | '}
                    <span className="post__replies">
                        {this.props.showReplies && <Replies replies={this.props.replies || 0} mid={this.props.mid} />}
                    </span>
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
    location: PropTypes.object.isRequired,
};

Post.defaultProps = {
    tags: [],
    replies: 0,
    showReplies: true
};
