import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import './index.css';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {audioMiddleware} from './middleware/audioMiddleware';
import {micMiddleware} from './middleware/micMiddleware';
import reducers from './reducers';
import {socketMiddleware, storeWrapper} from './middleware/socketMiddleware';

const store = createStore(
  reducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), 
  applyMiddleware(thunk, audioMiddleware, micMiddleware, socketMiddleware)  
);

storeWrapper(store)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
