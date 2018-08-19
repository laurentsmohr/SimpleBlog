import React from 'react'

class CreateComment extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      author: '',
      text: ''
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInput (e) {
    if (e.target.id === 'textarea') {
      this.setState({text: e.target.value})
    } else {
      this.setState({author: e.target.value})
    }
  }

  handleSubmit () {
    let comment = {
      author: this.state.author,
      comment: this.state.text,
      article_id: this.props.id
    }
    this.props.create(this.props.id, comment)
    this.setState({author: '', text: ''})
  }

  render () {
    return (
      <div className='createComment__box'>
        <form onSubmit={(e) => {
          e.preventDefault()
          this.handleSubmit()
        }} className='createComment__form'>
          <textarea id='textarea' maxLength={1000} className='createComment__form_text-input' placeholder='Add a comment...' value={this.state.text} onChange={this.handleInput} required />
          <label className='createComment__form_label'>Your name: &nbsp;</label>
          <input type='text' maxLength={100} id='username' className='createComment__form_username-input' value={this.state.author} onChange={this.handleInput} />
          <button className='std-btn' type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default CreateComment
