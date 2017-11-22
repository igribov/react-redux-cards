import axios from 'axios';

/*global API_HOST*/

if (typeof API_HOST === 'undefined') {
  throw new Error('Undefined API_HOST varible');
}

export default axios.create({
  baseURL: API_HOST + '/api',
  responseType: 'json'
});
