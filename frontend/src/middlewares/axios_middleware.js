import axiosService from '../services/axios';
import axiosMiddleware from 'redux-axios-middleware';

const middlewareConfig =  {
  interceptors: {
    request: [
      (getState, config) => {
        config.headers['Authorization'] = 'Bearer ' + 'accesstoken123456789123456789012';

        return config
      }
    ],
    response: [
      (res, req) => {
        console.log(res, req);
        return res;
      }
    ]
  }
};

export default (client) => axiosMiddleware(client, middlewareConfig);
