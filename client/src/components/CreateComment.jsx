import React from 'react';

class CreateComment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      author: "",
      text: ""
    }
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    if(e.target.id === 'textarea') {
      this.setState({text: e.target.value})
    } else {
      this.setState({author: e.target.value})
    }
  }

  render() {
    return (
      <div className="createComment__box">
        <form onSubmit={(e) => {
            e.preventDefault();
            this.props.create(this.state);
            this.setState({author: "", text: ""});
          }} 
          className="createComment__form">
          <textarea id="textarea" maxlength="1000" className="createComment__form_text-input" placeholder="Add a comment..." value={this.state.text} onChange={this.handleInput} required/>
          <label className="createComment__form_label">Your name: &nbsp;</label>
          <input type="text" maxlength="100" id="username" className="createComment__form_username-input" value={this.state.author} onChange={this.handleInput} required/>
            <button className="std-btn" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default CreateComment;