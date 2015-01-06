var Reflux = require('reflux');
var actions = require('../actions');

module.exports = Reflux.createStore({

  listenables: actions,

  deliveryTimesUpdated: function(deliveryTimes) {
    var now = new Date();
    var min = now.getMinutes() + now.getHours() * 60;
    var day = now.getDay();

    var mod = x => (x + 7) % 7;

    var deliveryTime = _.find(deliveryTimes, d => d.dayOfWeek === day && d.startMinutes <= min && min <= d.endMinutes);
    var isNow = !!deliveryTime;

    if (!deliveryTime) {
      deliveryTime = _(deliveryTimes)
        .filter(d => d.dayOfWeek !== day || d.startMinutes > min)
        .sort((a, b) => a.startMinutes - b.startMinutes)
        .sort((a, b) => mod(a.dayOfWeek - day) - mod(b.dayOfWeek - day))
        .first();
    }

    this.trigger({ deliveryTime, isNow });
  },

});
