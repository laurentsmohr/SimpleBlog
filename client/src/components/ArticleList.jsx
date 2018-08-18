import React from 'react';
import {Link} from 'react-router-dom';
import ArticleMeta from './ArticleMeta.jsx';

const ArticleList = ({articles}) => (
  <div className="article-list">
    {articles.map((article, i) => (
      <ArticleMeta key={i} article={article} />
    ))}
  </div>
)

export default ArticleList;

