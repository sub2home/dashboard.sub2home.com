var Reflux = require('reflux');
var AuthActions = require('../actions/AuthActions');
var localStorage = window.localStorage;

module.exports = Reflux.createStore({
  listenables: AuthActions,
  onLoginSuccess: function(token) {
    localStorage.setItem('token', token);
    this.trigger(true);
  },
  onLoginFail: function() {
    this.trigger(false);
  },
});
