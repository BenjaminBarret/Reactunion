import { createStore } from 'redux';
import articleReducer from './Reducers/ArticleReducer'

export default createStore(articleReducer)