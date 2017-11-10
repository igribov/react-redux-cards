import {Redirect} from 'react-router-dom';

function isPromise(val) {
  return val && typeof val.then === 'function';
}

export const redirectionMiddleware = store => next => action => {

  if(isPromise(action.payload)) {
    console.log('ping --> ', store);
    action.payload.catch(err => console.log(err));
  }


  return next(action);
};
