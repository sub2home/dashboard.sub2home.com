var Reflux = require('reflux');
var actions = require('../actions');

module.exports = Reflux.createStore({

  listenables: actions,

  init: function() {
    this._deliveryTimes = [];
    setInterval(this._update.bind(this), 60000);
  },

  deliveryTimesUpdated: function(deliveryTimes) {
    this._deliveryTimes = deliveryTimes;
    this._update();
  },

  _update: function() {
    var now = new Date();
    var min = now.getMinutes() + now.getHours() * 60;
    var day = now.getDay();

    var mod = x => (x + 7) % 7;

    var deliveryTime = _.find(this._deliveryTimes, d => d.dayOfWeek === day && d.startMinutes <= min && min <= d.endMinutes);
    var isNow = !!deliveryTime;

    if (!isNow) {
      deliveryTime = _(this._deliveryTimes)
        .filter(d => d.dayOfWeek !== day || d.startMinutes > min)
        .sortBy('startMinutes')
        .sortBy(d => mod(d.dayOfWeek - day))
        .first();
    }

    this.trigger({ deliveryTime, isNow });
  },

});
