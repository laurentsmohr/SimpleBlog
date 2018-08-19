import React from 'react'
import {Link} from 'react-router-dom'

const ArticleMeta = ({article}) => (
  <div className='meta-article'>
    <Link to={`/${article.id}`}>
      <div className='meta-article__title' >{article.title}</div>
    </Link>
    <p className='meta-article__description'>{article.description}</p>
  </div>
)

export default ArticleMeta
