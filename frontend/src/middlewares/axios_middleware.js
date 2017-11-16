import axiosService from '../services/axios';
import axiosMiddleware from 'redux-axios-middleware';
import {apiIdbRequestInterceptor, apiIdbResponseInterceptor} from '../idb/';

const middlewareConfig =  {
  interceptors: {
    request: [
      (getState, req) => {
        req.headers['Authorization'] = 'Bearer ' + 'accesstoken123456789123456789012';

        return req;
      },
      apiIdbRequestInterceptor
    ],
    response: []
  }
};

export default (client) => axiosMiddleware(client, middlewareConfig);
