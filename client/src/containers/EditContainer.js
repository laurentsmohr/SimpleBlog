import React from 'react';
import EditArticle from '../components/EditArticle';
import { connect } from 'react-redux';
import { editArticle } from '../actions/index.js';


const mapStateToProps = (state) => ({
  current: state.current
});

const mapDispatchToProps = (dispatch) => ({
  editArticle: (article) => dispatch(editArticle(article))
});

const EditContainer = connect(mapStateToProps, mapDispatchToProps)(EditArticle);

export default EditContainer;