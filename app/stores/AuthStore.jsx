var Reflux = require('reflux');
var AuthActions = require('../actions/AuthActions');
var Api = require('../utils/Api');

module.exports = Reflux.createStore({

  LOGIN_SUCCESS: 1,
  LOGIN_ERROR: 2,
  LOGOUT: 3,

  listenables: AuthActions,

  login: function(number, password) {
    var self = this;
    Api.post('login', {number, password})
      .then(data => {
        localStorage.setItem('token', data.token);
        self.trigger(this.LOGIN_SUCCESS);
      })
      .catch(() => self.trigger(this.LOGIN_ERROR));
  },

  logout: function(number, password) {
    localStorage.removeItem('token');
    self.trigger(this.LOGOUT);
  },

  isLoggedIn: function() {
    return localStorage.getItem('token') !== null;
  },

});
