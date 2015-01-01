var Reflux = require('reflux');
var AuthActions = require('../actions/AuthActions');
var localStorage = window.localStorage;
var Api = require('../utils/Api');

module.exports = Reflux.createStore({

  LOGIN_SUCCESS: 1,
  LOGIN_ERROR: 2,
  LOGOUT: 3,

  listenables: AuthActions,

  onLogin: function(number, password) {
    var self = this;
    Api.post('login', {number, password})
      .then(function(data) {
        localStorage.setItem('token', data.token);
        self.trigger(this.LOGIN_SUCCESS);
      })
      .catch(function() {
        self.trigger(this.LOGIN_ERROR);
      });
  },

  onLogout: function(number, password) {
    localStorage.removeItem('token');
    self.trigger(this.LOGOUT);
  },

  isLoggedIn: function() {
    return localStorage.getItem('token') !== null;
  },

});
