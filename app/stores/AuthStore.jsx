var Reflux = require('reflux');
var AuthActions = require('../actions/AuthActions');
var localStorage = window.localStorage;
var Api = require('../utils/Api');

module.exports = Reflux.createStore({

  listenables: AuthActions,

  onLogin: function(number, password) {
    var self = this;
    Api.post('login', {number, password})
      .then(function(data) {
        self.trigger(true);
        localStorage.setItem('token', data.token);
      })
      .catch(function() {
        self.trigger(false);
      });
  },

  onLogout: function(number, password) {
    localStorage.removeItem('token');
  },

});
