import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ArticleMeta from './components/ArticleMeta.jsx';
import Article from './components/Article.jsx';
import Comments from './components/Comments.jsx';
import CreateArticle from './components/CreateArticle.jsx';
import EditArticle from './components/EditArticle.jsx';
import { BrowserRouter, Route, Link, Switch, browserHistory } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      current: null
    }
    this.readArticle = this.readArticle.bind(this);
    this.createComment = this.createComment.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.createArticle = this.createArticle.bind(this);
    this.editArticle = this.editArticle.bind(this);
  }

  componentDidMount() {
    axios.get('/articles')
    .then(res => {
      res.data.reverse();
      this.setState({
        articles: res.data
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  readArticle(id) {
    axios.get(`/articles/${id}`)
    .then(res => {
      this.setState({
        current: res.data,
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  createComment(comment) {
    let article_id = this.state.current.article[0].id;
    let commentObj = {
      author: comment.author,
      comment: comment.text,
      article_id: article_id
    };
    let newCurrent = Object.assign({}, this.state.current);
    newCurrent.comments.unshift(commentObj);
    this.setState({current: newCurrent});
    axios.post(`/articles/${article_id}/comment`, commentObj)
    .catch(err => console.log(err));
  };

  createArticle(article) {
    axios.post('/articles', article)
    .then(res => {
      article.article_id = res.data.insertId;
      this.setState(prevState => {
        return {articles: [article, ...prevState.articles]};
      })
    })
    .catch(err => {
      console.log(err);
    })
  };

  editArticle(article) {
    console.log(article.id)
    axios.put(`/articles/${article.id}`, article)
    .then(res => {
      let currentArticle = Object.assign({}, this.state.current);
      currentArticle.article = article;
      this.setState({
        current: currentArticle
      })
    })
  };

  openPopup() {
    let popup = document.getElementById('popup');
    popup.style.visibility = 'visible';
    popup.style.opacity = 1;
  };

  render() {
    return (
      <Switch>
        <Route exact={true} path="/" render={() => (
          <div className="container">
            <div className="button__box">
              <button className="std-btn" onClick={this.openPopup}>New Post</button>
            </div>
            {this.state.articles.map(article => {
              return <ArticleMeta key={article.id} article={article} readArticle={this.readArticle} />
            })}
            <CreateArticle createArticle={this.createArticle} />
          </div>
        )}/>
        <Route exact path="/:id" render={({match}) => (
          <div className="container">
            <Article article={this.state.current.article[0]} openPopup={this.openPopup}/>
            <Comments comments={this.state.current.comments} createComment={this.createComment}/>
            <EditArticle editArticle={this.editArticle} article={this.state.current.article[0]}/>
          </div>
        )}/>
      </Switch>
    )
  }
};

ReactDOM.render((
  <BrowserRouter history={browserHistory}>
    <App />
  </BrowserRouter>
), document.getElementById('app'));