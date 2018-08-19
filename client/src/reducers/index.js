import { combineReducers } from 'redux';
import { articles, currentArticle, currentComments } from './articles';

export default combineReducers({ articles, currentArticle, currentComments });