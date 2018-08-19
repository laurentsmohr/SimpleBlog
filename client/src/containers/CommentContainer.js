import React from 'react'
import Comment from '../components/Comment.jsx'
import CreateComment from '../components/CreateComment.jsx'
import { connect } from 'react-redux'
import { createComment } from '../actions/index.js'
import { withRouter } from 'react-router-dom'

const CommentContainer = ({createComment, comments, match}) => {
  return <div className='comments-section'>
    <p className='comments-section__header'>Comments</p>
    {comments.map((comment, i) => {
      return <Comment comment={comment} key={i} />
    })}
    <CreateComment create={createComment} id={match.params.id} />
  </div>
}

const mapStateToProps = (state) => ({
  comments: state.currentComments
})

const mapDispatchToProps = (dispatch) => ({
  createComment: (id, comment) => dispatch(createComment(id, comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommentContainer))
