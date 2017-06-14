import { combineReducers } from 'redux';
import socketWrapper from './components/socket-wrapper/reducers';
import app from './components/app/reducers';
import metronome from './components/metronome/reducers';


export default combineReducers({
  socketWrapper,
  app,
  metronome,
});