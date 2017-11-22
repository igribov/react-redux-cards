import axiosMiddleware from 'redux-axios-middleware';

const middlewareConfig =  {
  interceptors: {
    request: [
      (getState, req) => {
        req.headers['Authorization'] = 'Bearer ' + 'accesstoken123456789123456789012';

        return req;
      },
    ],
    //response: []
  }
};

export default (client) => axiosMiddleware(client, middlewareConfig);
