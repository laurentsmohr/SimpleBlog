import React from 'react';
import axios from 'axios';
import store from './store/configureStore';
import { fetchArticle } from '../actions/index';

class Article extends React.Component {

  componentDidMount() {
    store.dispatch(fetchArticle(match.params.id))
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
