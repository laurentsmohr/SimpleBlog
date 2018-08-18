import { combineReducers } from 'redux';
import { articles, current } from './articles';

export default combineReducers({ articles, current });