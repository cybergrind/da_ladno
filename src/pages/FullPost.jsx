import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import juick from '../api/juick';
import { Post } from './Post.jsx';
import { Comment } from '../components/comment.jsx';


class FullPostBase extends Component {
    getOrLoadMessage(){
        let mid = this.props.location.query.mid;
        let msg = this.props.full[mid];
        if (!msg){
            juick.loadFull(mid);
        }
        return msg;
    }
    render(){
        let msg = this.getOrLoadMessage();
        if (!msg){
            return <h1>Loading full message...</h1>;
        }
        let comments = msg.slice(1);
        return (
            <div>
                <Post {...msg[0]} showReplies={false}/>
                {comments.map(c => <Comment key={`${c.mid}_${c.rid}`} {...c} />)}
            </div>
        );
    }
}
FullPostBase.propTypes = {
    full: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

function getFull(s){
    let full = s.full || {};
    return { full };
}

let FullPost = connect(getFull)(FullPostBase);
export default FullPost ;
