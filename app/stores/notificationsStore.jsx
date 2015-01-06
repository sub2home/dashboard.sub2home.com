var Reflux = require('reflux');
var actions = require('../actions');

var idCounter = 0;

module.exports = Reflux.createStore({

  listenables: actions,

  init: function() {
    this._notifications = [];
  },

  pushNotification: function(text) {
    var notification = { text, id: ++idCounter };
    this._notifications.push(notification);
    this._update();

    setTimeout(this.removeNotification.bind(this, notification), 5000);
  },

  removeNotification: function(notification) {
    this._notifications.splice(this._notifications.indexOf(notification), 1);
    this._update();
  },

  _update: function() {
    this.trigger(this._notifications);
  },

});
