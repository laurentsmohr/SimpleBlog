import axios from 'axios';

export const fetchArticle = (id) => {
  axios.get(`/articles/${id}`)
  .then(res => {
    this.setState({
      current: res.data,
    })
  })
  .catch(err => {
    console.log(err);
  })
};

export const fetchArticleSuccess = (article) => {
  return {
    type: 'FETCH_ARTICLE_SUCCESS',
    article
  }
};