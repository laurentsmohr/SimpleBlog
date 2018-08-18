import React from 'react';
import CreateComment from './CreateComment.jsx';
import Comment from './Comment.jsx';


const Comments = ({id, comments, createComment}) => (
  <div className="comments-section">
    <p className="comments-section__header">Comments</p>
    {comments.map((comment, i) => {
      return <Comment key={i} comment={comment} />
    })}
    <CreateComment create={createComment} id={id}/>
  </div>
) 

export default Comments;