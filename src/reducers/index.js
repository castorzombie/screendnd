import { combineReducers } from 'redux';
import screensReducer from './screensReducer';

export default combineReducers({
    screens: screensReducer
})