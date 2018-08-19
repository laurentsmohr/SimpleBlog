import React from 'react';
import ReactDOM from 'react-dom';
import ArticleContainer from './containers/ArticleContainer';
import ArticleListContainer from './containers/ArticleListContainer';
import CommentContainer from './containers/CommentContainer';
import CreateContainer from './containers/CreateContainer';
import EditContainer from './containers/EditContainer';
import { BrowserRouter, Route, Link, Switch, browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { fetchAllArticles } from './actions/index';

const store = configureStore({
  articles: [],
  currentArticle: null,
  currentComments: []
});


class App extends React.Component {
  constructor(props) {
    super(props)
    this.openPopup = this.openPopup.bind(this);

  //  this.myRef = React.createRef()
  }

  componentDidMount() {
    store.dispatch(fetchAllArticles());
  }

  openPopup() {
//    if (this.myRef.current) {
     // this.myRef.current.style ...
  //  }
    let popup = document.getElementById('popup');
    popup.style.visibility = 'visible';
    popup.style.opacity = 1;
  }

  render() {
    return (
      <Switch>
        <Route exact={true} path="/" render={() => (  
          <div className="container">
            <ArticleListContainer openPopup={this.openPopup}/>
            <CreateContainer />
          </div>
        )}/>
        <Route exact path="/:id" render={({match}) => (
          <div className="container">
            <ArticleContainer openPopup={this.openPopup}/>
            <CommentContainer />
            <EditContainer />
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
