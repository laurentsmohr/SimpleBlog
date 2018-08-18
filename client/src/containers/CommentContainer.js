import React from 'react';
import Comments from '../components/Comments';
import { connect } from 'react-redux';
import { createComment } from '../actions/index.js';


const mapStateToProps = (state) => ({
  comments: state.current.comments,
  id: state.current.article[0].id
});

const mapDispatchToProps = (dispatch) => ({
  createComment: (id, comment) => dispatch(createComment(id, comment))
});

const CommentContainer = connect(mapStateToProps, mapDispatchToProps)(Comments);

export default CommentContainer;