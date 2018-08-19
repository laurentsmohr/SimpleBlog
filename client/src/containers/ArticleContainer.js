import React from 'react'
import Article from '../components/Article.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { connect } from 'react-redux'
import { fetchArticle, deleteArticle, resetCurrentArticle } from '../actions/index.js'
import { withRouter } from 'react-router-dom'

class ArticleContainer extends React.Component {
  componentDidMount () {
    this.props.fetchArticle(this.props.match.params.id)
  }

  componentWillUnmount () {
    this.props.resetCurrentArticle()
  }

  deleteArticle (id) {
    this.props.deleteArticle(id, () => {
      this.props.history.push('/')
    })
  }

  render () {
    const { article } = this.props
    if (!article) return <LoadingSpinner />
    return <Article article={article} deleteArticle={this.deleteArticle.bind(this)} openPopup={this.props.openPopup} />
  }
}

const mapStateToProps = (state) => ({
  article: state.currentArticle
})

const mapDispatchToProps = (dispatch) => ({
  fetchArticle: (id) => dispatch(fetchArticle(id)),
  deleteArticle: (id, cb) => dispatch(deleteArticle(id, cb)),
  resetCurrentArticle: () => dispatch(resetCurrentArticle())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ArticleContainer))
