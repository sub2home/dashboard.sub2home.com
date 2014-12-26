var fetch = require('fetch').fetch;

module.exports = {

  _api: 'https://localhost:1070/',

  post: function(path, data) {
    return this._request(path, 'post', data).then(response => response.json());
  },

  _request: function(path, method, data) {
    var url = this._api + path;
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    var body = JSON.stringify(data);
    return fetch(url, {method, headers, body});
  },

}
