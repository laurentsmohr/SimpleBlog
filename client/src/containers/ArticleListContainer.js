import React from 'react'
import ArticleMeta from '../components/ArticleMeta.jsx'
import { connect } from 'react-redux'
import { fetchArticle } from '../actions/index.js'

class ArticleListContainer extends React.Component {
  render () {
    return (
      <div className='article-list'>
        <div className='button__box'>
          <button className='std-btn' onClick={this.props.openPopup}>New Post</button>
        </div>
        {this.props.articles.map((article, i) => {
          return <ArticleMeta key={i} article={article} fetchArticle={this.props.fetchArticle} />
        })}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  articles: state.articles
})

export const mapDispatchToProps = (dispatch) => ({
  fetchArticle: (id) => dispatch(fetchArticle(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer)
