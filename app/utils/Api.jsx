module.exports = {

  _api: 'https://localhost:1070/',

  get: function(path) {
    return this._request(path, 'get').then(response => response.json());
  },

  post: function(path, data) {
    return this._request(path, 'post', data).then(response => response.json());
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
    return fetch(url, {method, headers, body});
  },

};
