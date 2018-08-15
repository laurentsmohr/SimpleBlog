import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ArticleMeta from './components/ArticleMeta.jsx';
import Article from './components/Article.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      current: null
    }
    this.readArticle = this.readArticle.bind(this);
  }

  componentDidMount() {
    axios.get('/articles')
    .then(res => {
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
      console.log(res.data);
      this.setState({
        current: res.data
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    if(this.state.current === null) {
      return (
        <div className="containter">
          {this.state.articles.map(article => {
            return <ArticleMeta key={article.id} article={article} readArticle={this.readArticle} />
          })}
        </div>
      )
    } else {
      return (
        <div className="container">
          <Article article={this.state.current.article[0]} comments={this.state.current.comments} />
        </div>
      )
    }
  }
};

ReactDOM.render(<App />, document.getElementById('app'));