import React from 'react';
import EditArticle from '../components/EditArticle.jsx';
import { connect } from 'react-redux';
import { editArticle } from '../actions/index.js';

class EditContainer extends React.Component {
  render() {
    if(!this.props.article) return null;
    return <EditArticle article={this.props.article} editArticle={this.props.editArticle}/>
  }
}

const mapStateToProps = (state) => ({
  article: state.currentArticle
});

const mapDispatchToProps = (dispatch) => ({
  editArticle: (article) => dispatch(editArticle(article))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer);