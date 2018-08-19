import CreateArticle from '../components/CreateArticle.jsx'
import { connect } from 'react-redux'
import { createArticle } from '../actions/index.js'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  createArticle: (article) => dispatch(createArticle(article))
})

const CreateContainer = connect(mapStateToProps, mapDispatchToProps)(CreateArticle)

export default CreateContainer
