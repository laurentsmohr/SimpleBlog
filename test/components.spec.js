import React from 'react';
import { expect } from 'chai';
import { shallow, mount, configure } from 'enzyme';
import Article from '../client/src/components/Article.jsx'
import ArticleMeta from '../client/src/components/ArticleMeta.jsx'
import Comment from '../client/src/components/Comment.jsx'
import CreateArticle from '../client/src/components/CreateArticle.jsx'
import CreateComment from '../client/src/components/CreateComment.jsx'
import EditArticle from '../client/src/components/EditArticle.jsx'
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('components', () => {
  const article = {
    id: 1,
    title: 'My first article',
    description: 'this article is about nothing',
    author: 'Laurents Mohr',
    date: '2018-08-20',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
  describe('Article', () => {
    it('should render article wrapper and sub nodes', () => {
      const wrapper = shallow(<Article article={article}/>)
      expect(wrapper.find('div.article__wrapper')).to.have.length(1);
      expect(wrapper.find('div.button__box')).to.have.length(1);
      expect(wrapper.find('div.article__title').text()).to.equal('My first article');
    })
    it('should call openPopup when Edit Post button is clicked', () => {
    const openPopupSpy = sinon.spy();
    const wrapper = shallow(<Article article={article} openPopup={openPopupSpy}/>)
    const editButton = wrapper.find('.std-btn').first()

    editButton.simulate('click');
    expect(openPopupSpy.calledOnce).to.equal(true);
    })
    it('should call deleteArticle when Delete Post button is clicked', () => {
      const deleteArticleSpy = sinon.spy();
      const wrapper = shallow(<Article article={article} deleteArticle={deleteArticleSpy}/>)
      const deleteButton = wrapper.find('.std-btn').at(1)
  
      deleteButton.simulate('click');
      expect(deleteArticleSpy.calledOnce).to.equal(true);
      expect(deleteArticleSpy.calledWith(1)).to.equal(true);
    })
  })

  describe('ArticleMeta', () => {
    it('should render', () => {
      const wrapper = shallow(<ArticleMeta article={article}/>)
      expect(wrapper.find('div.meta-article')).to.have.length(1);
      expect(wrapper.find('p.meta-article__description').text()).to.equal(article.description);
    })
  })

  describe('Comment', () => {
    const comment = {
      author: 'Nick Rogers',
      comment: 'Nice!'
    }
    it('should render', () => {
      const wrapper = shallow(<Comment comment={comment}/>)
      expect(wrapper.find('div.comment-box')).to.have.length(1);
      expect(wrapper.find('p.comment__text').text()).to.equal(comment.comment);
    })
  })

  describe('CreateArticle', () => {
    const createArticleSpy = sinon.spy()
    const wrapper = shallow(<CreateArticle createArticle={createArticleSpy}/>)
    it('should render', () => {
      expect(wrapper.find('#popup')).to.have.length(1);
      expect(wrapper.find('p.create-post-form__title').text()).to.equal('Create a new post');
    })

    it('should update state when input field value changed', () => {
      expect(wrapper.state().author).to.equal('')
      wrapper.find('#author-input').simulate('change', {target: { id: 'author-input', value: 'T'}})
      expect(wrapper.state().author).to.equal('T')
    })
  })

  describe('CreateComment', () => {
    var createCommentSpy;
    var wrapper;
    beforeEach(() => {
      createCommentSpy = sinon.spy()
      wrapper = shallow(<CreateComment id={99} create={createCommentSpy}/>)
    })

    it('should render', () => {
      expect(wrapper.find('div.createComment__box')).to.have.length(1);
      expect(wrapper.find('button.std-btn').text()).to.equal('Submit');
    })

    it('should call handleSubmit when submit button is clicked', () => {
      const handleSubmitSpy = sinon.spy(wrapper.instance(), 'handleSubmit')
      wrapper.setState({author: 'Tobias', text: 'wow'})
      wrapper.find('form').simulate('submit', {preventDefault: () => {}})
      expect(handleSubmitSpy.calledOnce).to.be.true
    })

    it('should update state when input has been given', () => {
      expect(wrapper.state().author).to.equal('')
      wrapper.find('#username').simulate('change', {target: { id: 'username', value: 'T'}})
      expect(wrapper.state().author).to.equal('T')
    })

    it('handleSubmit should call this.props.create and reset the state' , () => {
      wrapper.setState({author: 'Tobias', text: 'wow'})
      wrapper.find('form').simulate('submit', {preventDefault: () => {}})
      expect(createCommentSpy.calledOnce).to.be.true
      expect(createCommentSpy.calledWith(99, {author: 'Tobias', comment: 'wow', article_id: 99})).to.equal(true)
      expect(wrapper.state()).to.eql({author: '', text: ''})
    })
  })

  describe('EditArticle', () => {
    const editArticleSpy = sinon.spy()
    const wrapper = shallow(<EditArticle article={article} editArticle={editArticleSpy}/>)

    it('should render', () => {
      expect(wrapper.find('#popup')).to.have.length(1);
      expect(wrapper.find('p.create-post-form__title').text()).to.equal('Edit your post');
    })

    it('should set state based on props', () => {
      expect(wrapper.state().author).to.equal(article.author)
      expect(wrapper.state().title).to.equal(article.title)
    }) 

    it('should update state based on props', () => {
      let newArticle = {
        id: 17,
        title: 'My second article',
        description: 'this article is about everything',
        author: 'Laurents Mohr',
        date: '2018-08-20',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
      wrapper.setProps({article: newArticle})
      expect(wrapper.state().id).to.equal(17)
      expect(wrapper.state().title).to.equal('My second article')
    }) 

    it('should update state when input field value changed', () => {
      wrapper.setState({author: ''})
      wrapper.find('#author-input').simulate('change', {target: { id: 'author-input', value: 'T'}})
      expect(wrapper.state().author).to.equal('T')
    })
  })
})
