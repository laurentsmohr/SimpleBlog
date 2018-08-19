import React from 'react';

const Article = ({article, deleteArticle, openPopup}) => {
    return (
      <div className="article__wrapper">
        <div className="button__box">
            <button className="std-btn" onClick={openPopup}>Edit Post</button>
            <button className="std-btn btn-cancel" onClick={() => deleteArticle(article.id)}>Delete Post</button>
        </div>
        <div className="article">
          <div className="article__title">
            {article.title}
          </div>
          <p className="article__info">
            <span className="article__info_author">By {article.author}</span>
            <span className="article__info_date">{article.date}</span>
          </p>
          <div className="article__text">
            {article.text}
          </div>
        </div>
      </div>
    )
};

export default Article;
