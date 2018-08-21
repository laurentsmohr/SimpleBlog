import { expect } from 'chai'
import { fetchAllArticlesSuccess,
  resetCurrentArticle,
  fetchArticleSuccess,
  createArticleSuccess,
  editArticleSuccess,
  deleteArticleSuccess,
  createCommentSuccess } from '../client/src/actions/index'

describe('ActionCreators', () => {
  const data = {author: 'J.K. Rowling', title: 'Harry Potter and...'}

  it('resetCurrentArticle should return action as expected', () => {
    expect(resetCurrentArticle()).to.be.an('object')
    expect(resetCurrentArticle()).to.eql({type: 'RESET_CURRENT_ARTICLE'})
  })

  it('fetchArticleSuccess should return action as expected', () => {
    expect(fetchArticleSuccess(data)).to.be.an('object')
    expect(fetchArticleSuccess(data)).to.eql({type: 'FETCH_ARTICLE_SUCCESS', data})
  })

  it('fetchAllArticlesSuccess should return action as expected', () => {
    expect(fetchAllArticlesSuccess(data)).to.be.an('object')
    expect(fetchAllArticlesSuccess(data)).to.eql({type: 'FETCH_ALL_ARTICLES_SUCCESS', articles: data})
  })

  it('createArticleSuccess should return action as expected', () => {
    expect(createArticleSuccess(data)).to.be.an('object')
    expect(createArticleSuccess(data)).to.eql({type: 'CREATE_ARTICLE', article: data})
  })

  it('editArticleSuccess should return action as expected', () => {
    expect(editArticleSuccess(data)).to.be.an('object')
    expect(editArticleSuccess(data)).to.eql({type: 'EDIT_ARTICLE', article: data})
  })

  it('deleteArticleSuccess should return action as expected', () => {
    expect(deleteArticleSuccess(9)).to.be.an('object')
    expect(deleteArticleSuccess(9)).to.eql({type: 'DELETE_ARTICLE', id: 9})
  })

  it('createCommentSuccess should return action as expected', () => {
    expect(createCommentSuccess(data)).to.be.an('object')
    expect(createCommentSuccess(data)).to.eql({type: 'CREATE_COMMENT', comment: data})
  })
})
