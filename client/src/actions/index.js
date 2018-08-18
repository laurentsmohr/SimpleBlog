import axios from 'axios';

export const fetchArticle = (id) => {
  return (dispatch) => {
    axios.get(`/articles/${id}`)
    .then(res => {
      dispatch(fetchArticleSuccess(res.data))
    })
    .catch(err => {
      console.log(err);
    })
  }
};

export const fetchArticleSuccess = (article) => {
  return {
    type: 'FETCH_ARTICLE_SUCCESS',
    article
  }
};

export const fetchAllArticles = () => {
  return (dispatch) => {
    axios.get('/articles')
    .then(res => {
      dispatch(fetchAllArticlesSuccess(res.data))
    })
    .catch(err => {
      console.log(err);
    })
  }
};

export const fetchAllArticlesSuccess = (articles) => {
  return {
    type: 'FETCH_ALL_ARTICLES_SUCCESS',
    articles
  }
};

export const createArticle = (article) => {
  return(dispatch) => {
    axios.post('/articles', article)
    .then(res => {
      dispatch(createArticleSuccess(article))
    })
    .catch(err => {
      console.log(err);
    })
  }
};

export const createArticleSuccess = (article) => {
  return {
    type: 'CREATE_ARTICLE',
    article
  }
};

export const editArticle = (article) => {
  return(dispatch) => {
    axios.put(`/articles/${article.id}`, article)
    .then(res => {
      dispatch(editArticleSuccess(article))
    })
    .catch(err => {
      console.log(err);
    })
  }
};

export const editArticleSuccess = (article) => {
  return {
    type: 'EDIT_ARTICLE',
    article
  }
};

export const deleteArticle = (id) => {
  return(dispatch) => {
    axios.delete(`/articles/${id}`)
    .then(res => {
      dispatch(deleteArticleSuccess(id))
    })
    .catch(err => {
      console.log(err);
    })
  }
};

export const deleteArticleSuccess = (id) => {
  return {
    type: 'DELETE_ARTICLE',
    id
  }
};

export const createComment = (id, comment) => {
  return(dispatch) => {
    axios.post(`/articles/${id}/comment`)
    .then(res => {
      dispatch(createCommentSuccess(comment))
    })
    .catch(err => {
      console.log(err);
    })
  }
};

export const createCommentSuccess = (comment) => {
  return {
    type: 'CREATE_COMMENT',
    comment
  }
};
