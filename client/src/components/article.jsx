import React from 'react';
import axios from 'axios';

class Article extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      article: {}
    }
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    axios.get(`/articles/${match.params.id}`)
    .then(res => {
      this.setState({
        current: res.data,
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  deletePost() {
    axios.delete(`/articles/${match.params.id}`)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
    // push history to go back to main
  }

  render() {
    console.log('Article props:', this.props);
    return (
      <div className="article__wrapper">
        <div className="button__box">
            <button className="std-btn" onClick={this.props.openPopup}>Edit Post</button>
            <button className="std-btn btn-cancel" onClick={this.deletePost}>Delete Post</button>
        </div>
        <div className="article">
          <div className="article__title">
            {this.state.article.title}
          </div>
          <p className="article__info">
            <span className="article__info_author">By {this.state.article.author}</span>
            <span className="article__info_date">{this.state.article.date}</span>
          </p>
          <div className="article__text">
            {this.state.article.text}
          </div>
        </div>
      </div>
    )
  }
};

export default Article;
