import React from 'react';
import Article from '../components/Article.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { connect } from 'react-redux';
import { fetchArticle, deleteArticle } from '../actions/index.js';
import { withRouter } from 'react-router-dom';


class ArticleContainer extends React.Component {
  componentDidMount () {
    this.props.fetchArticle(this.props.match.params.id); 
  }

  deleteArticle(id) {
    this.props.deleteArticle(id)
      .then(() => {
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render () {
    const { article } = this.props
    if (!article) return <LoadingSpinner />

    return <Article article={article} deleteArticle={this.deleteArticle.bind(this)} openPopup={this.props.openPopup}/>
  }
}

const mapStateToProps = (state) => ({
  article: state.currentArticle
});

const mapDispatchToProps = (dispatch) => ({
  fetchArticle: (id) => dispatch(fetchArticle(id)),
  deleteArticle: (id) => dispatch(deleteArticle(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ArticleContainer));
