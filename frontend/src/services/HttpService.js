import axios from 'axios';

const ROOT_URL = `${API_HOST}/api`;

export default class HttpService {

  config = {
    headers: {}
  };

  constructor(config = {}) {
    if (config.headers['Authorization']) {
      for (let header in config.headers) {
        this.config.headers[header] = config.headers[header];
      }
    } else {
      console.error('No authorization header');
    }
  }


  get(endpoint) {
    let transport = axios.create({headers: this.config.headers});

    return transport.get(`${ROOT_URL}/${endpoint}`);
  }

  post(endpoint, data) {
    let transport = axios.create({headers: this.config.headers});

    return transport.post(`${ROOT_URL}/${endpoint}`, data);
  }

  put(endpoint, data) {
    let transport = axios.create({headers: this.config.headers});

    return transport.put(`${ROOT_URL}/${endpoint}`, data);
  }

  del(endpoint) {
    let transport = axios.create({headers: this.config.headers});

    return transport.delete(`${ROOT_URL}/${endpoint}`);
  }
}
