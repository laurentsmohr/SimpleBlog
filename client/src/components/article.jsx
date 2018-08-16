import React from 'react';
import axios from 'axios';

class Article extends React.Component {
  constructor(props) {
    super(props)
    this.deletePost = this.deletePost.bind(this);
  }

  deletePost() {
    axios.delete(`/articles/${this.props.article.id}`)
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
            {this.props.article.title}
          </div>
          <p className="article__info">
            <span className="article__info_author">By {this.props.article.author}</span>
            <span className="article__info_date">{this.props.article.date}</span>
          </p>
          <div className="article__text">
            {this.props.article.text}
          </div>
        </div>
      </div>
    )
  }
};

export default Article;
