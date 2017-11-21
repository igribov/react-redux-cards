import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';
import axiosMiddleware from './middlewares/axios_middleware';
import client from './services/axios';
import reducers from './reducers';
import App from './components/app';

import './style/style.styl';

const createStoreWithMiddleware = applyMiddleware(axiosMiddleware(client), promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , self.document.querySelector('#app')
);
