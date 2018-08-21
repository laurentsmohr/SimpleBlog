import { expect } from 'chai' 
import { currentArticle, currentComments, articles } from '../client/src/reducers/articles.js'

describe('reducers',  () => {
  const fakeAction = {
    type: 'FETCH_ARTICLE_SUCCESS', 
    data: {
      article: {
        script: 'this is my only line.'
      }, 
      comments: ['a', 'b', 'c']
    }
  }
  const fakeAction2 = {
      type: 'EDIT_ARTICLE', 
      article: {
        script: 'this is my only line.'
      }
  } 
  const fakeState = {
    articles: ['x', 'y', 'z'],
    currentArticle: {
      script: 'this is my only line.'
    },
    currentComments: ['a', 'b', 'c']
  }
  const fakeAction3 = Object.assign({}, fakeAction2, {type: 'RESET_CURRENT_ARTICLE'})
  describe('currentArticle', () => {
    it('should be a function that accepts a state and an action', () => {
      expect(currentArticle).to.be.a('function')
      expect(currentArticle.bind(this)).to.throw()
      expect(currentArticle.bind(this, fakeState.currentArticle)).to.throw()
    })
    it('should have a default state of "null"', () => {
      expect(currentArticle(undefined, {type: 'FOO_BAR'})).to.be.null
    })
    it('should change state to a new article when a "FETCH_ARTICLE_SUCCESS" action is passed in', () => {
      expect(currentArticle(undefined, fakeAction)).to.eql({script: 'this is my only line.'})
    })
    it('should change state to a new article when a "EDIT_ARTICLE" action is passed in', () => {
      expect(currentArticle(undefined, fakeAction2)).to.eql({script: 'this is my only line.'})
    })
    it('should change state to null when a "RESET_CURRENT_ARTICLE" action is passed in', () => {
      expect(currentArticle(undefined, fakeAction3)).to.be.null
    })
    it('should not mutate existing state', () => {
      expect(currentArticle.bind(this, Object.freeze(fakeState), fakeAction)).to.not.throw()
    })
  })
  
  describe('currentComments reducer should return correct state', () => {
    const createCommentAction = {
      type: 'CREATE_COMMENT',
      comment: {script: 'this is my only line.'}
    }
    it('should be a function that accepts a state and an action', () => {
      expect(currentComments).to.be.a('function')
      expect(currentComments.bind(this)).to.throw()
      expect(currentComments.bind(this, fakeState.currentComments)).to.throw()
    })
    it('should have a default state of "[]"', () => {
      expect(currentComments(undefined, {type: 'FOO_BAR'})).to.be.an('array').with.lengthOf(0)
    })
    it('should change state to new comments when a "FETCH_ARTICLE_SUCCESS" action is passed in', () => {
      expect(currentComments(undefined, fakeAction)).to.eql(['a', 'b', 'c'])
    })
    it('should append a comment to the new state when a "CREATE_COMMENT" action is passed in', () => {
      expect(currentComments(undefined, createCommentAction)).to.eql([{script: 'this is my only line.'}])
      expect(currentComments([1, 2, 3], createCommentAction)).to.eql([1, 2, 3, {script: 'this is my only line.'}])
    })
    it('should change state to an empty array when a "RESET_CURRENT_ARTICLE" action is passed in', () => {
      expect(currentComments(undefined, fakeAction3)).to.be.an('array').with.lengthOf(0)
    })
    it('should not mutate existing state', () => {
      expect(currentComments.bind(this, Object.freeze([1, 2, 3]), createCommentAction)).to.not.throw()
    })
  })

  describe('articles reducer should return correct state', () => {
    const fakeActions = {
      fetch: {
        type: 'FETCH_ALL_ARTICLES_SUCCESS', 
        articles: [1, 2, 3]
      },
      create: {
        type: 'CREATE_ARTICLE',
        article: {id: 9, title: 'lord of the rings'}
      },
      edit: {
        type: 'EDIT_ARTICLE',
        article: {id: 1, title: 'harry potter'}
      },
      delete: {
        type: 'DELETE_ARTICLE',
        id: 1
      }
    }
    const fakeArticles = [{id: 1, title: 'someTitle'}, {id: 3, title: 'the alchemist'}]
    it('should be a function that accepts a state and an action', () => {
      expect(articles).to.be.a('function')
      expect(articles.bind(this)).to.throw()
      expect(articles.bind(this, [1, 2, 3])).to.throw()
    })
    it('should have a default state of "[]"', () => {
      expect(articles(undefined, {type: 'FOO_BAR'})).to.be.an('array').with.lengthOf(0)
    })
    it('should change state to new articles when a "FETCH_ALL_ARTICLES_SUCCESS" action is passed in', () => {
      expect(articles(undefined, fakeActions.fetch)).to.eql([1, 2, 3])
    })
    it('should append an article to the new state when a "CREATE_ARTILCE" action is passed in', () => {
      let result = articles(fakeArticles, fakeActions.create)
      expect(result).to.be.an('array').with.lengthOf(3)
      expect(result[2]).to.eql(fakeActions.create.article)
    })
    it('should change edit an article in a new state when "EDIT_ARTICLE" action is passed in', () => {
      let result = articles(fakeArticles, fakeActions.edit)
      expect(result).to.be.an('array').with.lengthOf(2)
      expect(result[0].id).to.equal(1)
      expect(result[0].title).to.equal('harry potter')
    })
    it('should not mutate existing state', () => {
      expect(articles.bind(this, Object.freeze(fakeArticles), fakeActions.create)).to.not.throw()
    })
  })
})