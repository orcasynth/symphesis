import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import './index.css';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {createTimeclockMiddleware} from './middleware/timeclockMiddleware';
import reducers from './reducers';

const store = createStore(
  reducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), 
  applyMiddleware(thunk, createTimeclockMiddleware),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
