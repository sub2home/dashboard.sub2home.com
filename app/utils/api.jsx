var env = require('./env');
var session = require('./session');

var baseUrl = env.isProduction ? 'https://api.sub2home.com/' : `https://${location.hostname}:1070/`;
var errorHandlers = [];

module.exports = {

  registerErrorHandler: function(handler) {
    errorHandlers.push(handler);
  },

  get: function(path, options) {
    return this._request(path, 'get', options);
  },

  post: function(path, data, options) {
    return this._request(path, 'post', data, options);
  },

  put: function(path, data, options) {
    return this._request(path, 'put', data, options);
  },

  _request: function(path, method, data, options) {
    options = options || {};

    var url = baseUrl + path;
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    if (session.isLoggedIn()) {
      // TODO rename to Authorization
      headers.Token = session.getToken();
    }
    var body = JSON.stringify(data);
    var promise = fetch(url, {method, headers, body})
      .then(function(response) {
        if (response.status === 200) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject(response);
        }
      })
      .catch(function(error) {
        if (!options.disableErrorHandlers) {
          errorHandlers.forEach(handler => handler(error));
        }
      });

    return promise;
  },

};
