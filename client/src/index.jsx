import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ArticleMeta from './components/ArticleMeta.jsx';
import Article from './components/Article.jsx';
import Comments from './components/Comments.jsx';
import CreateArticle from './components/CreateArticle.jsx';
import EditArticle from './components/EditArticle.jsx';
import { BrowserRouter, Route, Link, Switch, browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import fetchAllArticles from './actions/index';

class App extends React.Component {
  constructor(props) {
    this.openPopup = this.openPopup.bind(this);
  }

  componentDidMount() {
    store.dispatch(fetchAllArticles());
  }

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
            <ArticleListContainer />
            <CreateContainer createArticle={this.createArticle} />
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
  <Provider store={store}>
    <BrowserRouter history={browserHistory}>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));