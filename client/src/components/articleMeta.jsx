import React from 'react';

const ArticleMeta = ({article, readArticle}) => (
  <div className='meta-article'>
    <div className="meta-article__title" onClick={() => readArticle(article.id)}>{article.title}</div>
    <p className="meta-article__description">{article.description}</p>
  </div>
)

export default ArticleMeta;