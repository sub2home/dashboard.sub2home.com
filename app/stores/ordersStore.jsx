var _ = require('lodash');
var Reflux = require('reflux');
var actions = require('../actions');
var filter = require('../utils/filter');

module.exports = Reflux.createStore({

  listenables: actions,

  init: function() {
    this._orders = [];
    this._filter = '';
  },

  ordersUpdated: function(orders) {
    this._orders = orders;
    this._update();
  },

  setOrdersFilter: function(filter) {
    this._filter = filter;
    this._update();
  },

  _update: function() {
    var orders = this._orders;

    if (this._filter) {
      var keys = [
        'addressModel.firstName',
        'addressModel.lastName',
        'addressModel.postal',
        'addressModel.city',
        'addressModel.district',
      ];
      orders = filter.forKeys(keys, this._orders, this._filter);
    }

    var now = new Date();

    var { current, upcoming, today, old } = _.groupBy(orders, function(order) {
      var dueDate = new Date(order.dueAt);
      var delta = (dueDate - now) / 60000;
      var isToday = dueDate.toDateString() === now.toDateString();

      if (delta >= 0 && delta <= order.deliveryAreaModel.minimumDuration) {
        return 'current';
      } else if (delta > order.deliveryAreaModel.minimumDuration) {
        return 'upcoming';
      } else if (isToday) {
        return 'today';
      } else {
        return 'old';
      }
    });

    current = current || [];
    upcoming = upcoming || [];
    today = today || [];
    old = old || [];

    current = current.sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt));
    upcoming = upcoming.sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt));
    today = today.sort((a, b) => new Date(b.dueAt) - new Date(a.dueAt));
    old = old.sort((a, b) => new Date(b.dueAt) - new Date(a.dueAt));
    isFiltered = this.filter !== '';

    this.trigger({ current, upcoming, today, old, isFiltered });
  },

});
