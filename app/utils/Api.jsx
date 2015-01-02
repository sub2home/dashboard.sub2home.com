var Env = require('./Env');

module.exports = {

  _api: Env.isProduction ? 'https://api.sub2home.com/' : `https://${location.hostname}:1070/`,

  get: function(path) {
    return this._request(path, 'get');
  },

  post: function(path, data) {
    return this._request(path, 'post', data);
  },

  put: function(path, data) {
    return this._request(path, 'put', data);
  },

  _request: function(path, method, data) {
    var url = this._api + path;
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    var token = localStorage.getItem('token');
    if (token) {
      // TODO rename to Authorization
      headers.Token = token;
    }
    var body = JSON.stringify(data);
    var promise = list(url, {method, headers, body});
    return promise.then(response => response.status === 200 ? response.json() : null);
  },

};
