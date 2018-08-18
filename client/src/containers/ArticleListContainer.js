import React from 'react';
import ArticleList from '../components/ArticleList.jsx';
import { connect } from 'react-redux';
import { fetchArticle } from '../actions/index.js';


const mapStateToProps = (state) => ({
  articles: state.articles
});

const mapDispatchToProps = (dispatch) => ({
  fetchArticle: (id) => dispatch(fetchArticle(id))
});

const ArticleListContainer = connect(mapStateToProps, mapDispatchToProps)(ArticleList);

export default ArticleListContainer;