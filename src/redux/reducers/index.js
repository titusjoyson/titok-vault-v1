import { combineReducers } from 'redux';
import secretsReducer from './secretsReducer';


export default combineReducers({
    "secrets": secretsReducer
})