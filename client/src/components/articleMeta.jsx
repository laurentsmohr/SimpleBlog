import React from 'react';
import {Link} from 'react-router-dom';

const ArticleMeta = ({article, readArticle}) => (
  <div className='meta-article'>
    <Link to={`/${article.id}`}>
      <div className="meta-article__title" onClick={() => readArticle(article.id)}>{article.title}</div>
    </Link>    
    <p className="meta-article__description">{article.description}</p>
  </div>
)

export default ArticleMeta;

