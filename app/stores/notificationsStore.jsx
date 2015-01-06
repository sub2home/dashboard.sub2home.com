var _ = require('lodash');
var Reflux = require('reflux');
var actions = require('../actions');

var idCounter = 0;

module.exports = Reflux.createStore({

  listenables: actions,

  init: function() {
    this._notifications = {};
  },

  pushNotification: function(text) {
    var notification = { text, id: ++idCounter };
    this._notifications[notification.id] = notification;
    this._update();

    setTimeout(this.removeNotification.bind(this, notification), 5000);
  },

  removeNotification: function(notification) {
    delete(this._notifications[notification.id]);
    this._update();
  },

  _update: function() {
    this.trigger(_.values(this._notifications));
  },

});
