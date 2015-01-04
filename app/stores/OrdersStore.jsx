var _ = require('lodash');
var Reflux = require('reflux');
var actions = require('../actions');
var api = require('../utils/api');
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

    var { old, current, future } = _.groupBy(orders, function(order) {
      var delta = (new Date(order.dueAt) - now) / 60000;
      if (delta < 0) {
        return 'old';
      } else if (delta <= order.deliveryAreaModel.minimumDuration) {
        return 'current';
      } else {
        return 'future';
      }
    });

    current = current || [];
    old = old || [];
    future = future || [];

    current = current.sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt));
    old = old.sort((a, b) => new Date(b.dueAt) - new Date(a.dueAt));
    future = future.sort((a, b) => new Date(b.dueAt) - new Date(a.dueAt));

    this.trigger({ old, current, future });
  },

});
