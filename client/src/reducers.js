import { combineReducers } from 'redux';
import socketWrapper from './components/socket-wrapper/reducers';
import app from './components/app/reducers';


export default combineReducers({
  socketWrapper,
  app,
});