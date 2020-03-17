import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header'

class CommentBox extends Component {

    state = {
        showComments: false,
        comments: [
            {id: 1, author: 'Owner', body: "This is a test comment"},
        ]
        };
    
    render () {
        const comments = this.getComments();
        let commentNodes;
        let buttonText = 'Show Comments';

        if (this.state.showComments) {
        buttonText = 'Hide Comments';
        commentNodes = <div className="comment-list">{comments}</div>;
        } 

        return(
        <div className="comment-box">
            <h2>Join the Discussion!</h2>
            <CommentForm addComment={this.addComment.bind(this)}/>
            <button id="comment-reveal" onClick={this.handleClick.bind(this)}>
            {buttonText}
            </button>
            <h3>Comments</h3>
            <h4 className="comment-count">
            {this.getCommentsTitle(comments.length)}
            </h4>
            {commentNodes}
        </div>  
        );
    } // end render
    
    addComment = (author, body) => {
        const comment = {
        id: this.state.comments.length + 1,
        author,
        body
        };
      this.setState({ comments: this.state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
    }
    
    handleClick = () => {
        this.setState({
        showComments: !this.state.showComments
        });
    }
    
    getComments = () => {    
        return this.state.comments.map((comment) => { 
        return (
            <Comment 
            author={comment.author} 
            body={comment.body} 
            key={comment.id} />
        ); 
        });
    }
    
    getCommentsTitle = (commentCount) => {
        if (commentCount === 0) {
        return 'No comments yet';
        } else if (commentCount === 1) {
        return "1 comment";
        } else {
        return `${commentCount} comments`;
        }
    }
  } // end CommentBox component

    class CommentForm extends Component {
    render() {
        return (
        <form className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
            <div className="comment-form-fields">
            <input placeholder="Name" required ref={(input) => this.author = input}></input><br />
            <textarea placeholder="Comment" rows="4" required ref={(textarea) => this.body = textarea}></textarea>
            </div>
            <div className="comment-form-actions">
            <button type="submit">Post Comment</button>
            </div>
        </form>
        );
    } // end render
    
    handleSubmit = (event) => { 
        event.preventDefault();
        let author = this.author;
        let body = this.body;
        this.props.addComment(author.value, body.value);
    }
  } // end CommentForm component

    class Comment extends Component {
    render () {
        return(
        <div className="comment">
            <p className="comment-header">{this.props.author}</p>
            <p className="comment-body">- {this.props.body}</p>
            <div className="comment-footer">
            {/* <a href="#" className="comment-footer-delete" onClick={this.deleteComment}>Delete Comment</a> */}
            </div>
        </div>
        );
    }
    }

export default CommentBox