import axios from 'axios'

export const fetchArticle = (id) => {
  return (dispatch) => {
    axios.get(`/articles/${id}`)
      .then(res => {
        dispatch(fetchArticleSuccess(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const fetchArticleSuccess = (data) => {
  return {
    type: 'FETCH_ARTICLE_SUCCESS',
    data
  }
}

export const resetCurrentArticle = () => {
  return {
    type: 'RESET_CURRENT_ARTICLE'
  }
}

export const fetchAllArticles = () => {
  return (dispatch) => {
    axios.get('/articles')
      .then(res => {
        dispatch(fetchAllArticlesSuccess(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const fetchAllArticlesSuccess = (articles) => {
  return {
    type: 'FETCH_ALL_ARTICLES_SUCCESS',
    articles
  }
}

export const createArticle = (article) => {
  return (dispatch) => {
    axios.post('/articles', article)
      .then(res => {
        let metaInfo = {
          id: res.data.insertId,
          title: article.title,
          description: article.description
        }
        dispatch(createArticleSuccess(metaInfo))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const createArticleSuccess = (article) => {
  return {
    type: 'CREATE_ARTICLE',
    article
  }
}

export const editArticle = (article) => {
  return (dispatch) => {
    axios.put(`/articles/${article.id}`, article)
      .then(res => {
        dispatch(editArticleSuccess(article))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const editArticleSuccess = (article) => {
  return {
    type: 'EDIT_ARTICLE',
    article
  }
}

export const deleteArticle = (id, cb) => {
  return (dispatch) => {
    axios.delete(`/articles/${id}`)
      .then(res => {
        dispatch(deleteArticleSuccess(id))
        cb()
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const deleteArticleSuccess = (id) => {
  return {
    type: 'DELETE_ARTICLE',
    id
  }
}

export const createComment = (id, comment) => {
  return (dispatch) => {
    axios.post(`/articles/${id}/comment`, comment)
      .then(res => {
        dispatch(createCommentSuccess(comment))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const createCommentSuccess = (comment) => {
  return {
    type: 'CREATE_COMMENT',
    comment
  }
}
