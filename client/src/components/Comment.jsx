import React from 'react'

const Comment = ({comment}) => (
  <div className='comment-box'>
    <p className='comment__author'>By {comment.author}:</p>
    <div className='comment'>
      <p className='comment__text'>{comment.comment}</p>
    </div>
  </div>
)

export default Comment
