import React, { Component, PropTypes } from 'react';


export class Comment extends Component {
    render(){
        return (
            <div className='comment'>
                <div className='user'>
                    @{this.props.user.uname}:
                </div>
                <div className='body'>
                    {this.props.body}
                </div>
            </div>
        );
    }
}
Comment.propTypes = {
    user: PropTypes.shape({
        uname: PropTypes.string.isRequired}),
    body: PropTypes.array.isRequired,
};
