import React from 'react';
import Article from '../components/Article.jsx';
import { connect } from 'react-redux';
import { fetchArticle, deleteArticle } from '../actions/index.js';


const mapStateToProps = (state) => ({
  article: state.current
});

const mapDispatchToProps = (dispatch) => ({
  fetchArticle: (id) => dispatch(fetchArticle(id)),
  editArticle: (article) => dispatch(editArticle(article)),
  deleteArticle: (id) => dispatch(deleteArticle(id))
});

const ArticleContainer = connect(mapStateToProps, mapDispatchToProps)(Article);

export default ArticleContainer;
