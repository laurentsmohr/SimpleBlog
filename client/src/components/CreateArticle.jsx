import React from 'react'

class CreateArticle extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      author: '',
      title: '',
      description: '',
      text: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.cancel = this.cancel.bind(this)
    this.clear = this.clear.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    let author = this.state.author || 'Anonymous'
    let description = this.state.description
    if (this.state.description.substring(this.state.description.length - 3) !== '...') {
      description += '...'
    }
    let article = {
      author: author,
      title: this.state.title,
      description: description,
      text: this.state.text
    }
    article.date = (new Date()).toISOString().split('T')[0]
    this.props.createArticle(article)
    this.clear()
  }

  cancel (e) {
    e.preventDefault()
    this.clear()
  }

  clear () {
    this.setState({
      author: '',
      title: '',
      description: '',
      text: ''
    })
    let popup = document.getElementById('popup')
    popup.style.visibility = 'hidden'
    popup.style.opacity = 0
  }

  handleInput (e) {
    let prop = e.target.id.split('-')[0]
    this.setState({
      [prop]: e.target.value
    })
  }

  render () {
    return (
      <div className='popup' id='popup'>
        <div className='popup__content'>
          <form className='create-post-form' onSubmit={this.handleSubmit}>
            <p className='create-post-form__title'>Create a new post</p>
            <label className='create-post-form__label'>Title:</label>
            <input type='text' className='create-post-form__input' id='title-input' maxLength={255} required value={this.state.title} onChange={(e) => this.handleInput(e)} />
            <label className='create-post-form__label' >Author:</label>
            <input type='text' className='create-post-form__input' id='author-input' maxLength={30} value={this.state.author} onChange={(e) => this.handleInput(e)} />
            <label className='create-post-form__label' >Description:</label>
            <input type='text' className='create-post-form__input' id='description-input' maxLength={252} value={this.state.description} onChange={(e) => this.handleInput(e)} />
            <label className='create-post-form__label'>Article:</label>
            <textarea type='text' className='create-post-form__textarea' id='text-input' maxLength={65000} value={this.state.text} onChange={(e) => this.handleInput(e)} required />
            <button className='std-btn' type='submit'>Submit</button>
            <button className='std-btn btn-cancel' onClick={this.cancel} formNoValidate>Cancel</button>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateArticle
