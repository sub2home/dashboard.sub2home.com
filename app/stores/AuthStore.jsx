var Reflux = require('reflux');
var actions = require('../actions');
var api = require('../utils/api');

module.exports = Reflux.createStore({

  LOGIN_SUCCESS: 1,
  LOGIN_ERROR: 2,
  LOGOUT: 3,

  listenables: actions,

  login: function(number, password) {
    var self = this;
    api.post('login', {number, password})
      .then(data => {
        localStorage.setItem('token', data.token);
        self.trigger(self.LOGIN_SUCCESS);
      })
      .catch(() => self.trigger(self.LOGIN_ERROR));
  },

  logout: function(number, password) {
    localStorage.removeItem('token');
    self.trigger(this.LOGOUT);
  },

  isLoggedIn: function() {
    return localStorage.getItem('token') !== null;
  },

});
