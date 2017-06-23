import { combineReducers } from 'redux';
import socketWrapper from './components/socket-wrapper/reducers';
import app from './components/app/reducers';
import audioWrapper from './components/audio-wrapper/reducers';
import mic from './components/mic/reducers';
import roomFinder from './components/room-finder/reducers';

export default combineReducers({
  socketWrapper,
  app,
  audioWrapper,
  mic,
  roomFinder
});