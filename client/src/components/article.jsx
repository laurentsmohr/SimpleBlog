import React from 'react';

class Article extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: []
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="article">
        <div className="article__title">
          {this.props.article.title}
        </div>
        <div className="article__text">
          {this.props.article.text}
        </div>
      </div>
    )
  }
};

export default Article;
