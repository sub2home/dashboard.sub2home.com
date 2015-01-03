var Reflux = require('reflux');
var actions = require('../actions');
var api = require('../utils/api');
var filter = require('../utils/filter');

module.exports = Reflux.createStore({

  listenables: actions,

  init: function() {
    this.orders = [];
    this.filter = '';
  },

  ordersUpdated: function(orders) {
    this.orders = orders;
    this.update();
  },

  setOrdersFilter: function(filter) {
    this.filter = filter;
    this.update();
  },

  update: function() {
    var orders = this.orders;

    if (this.filter) {
      var keys = [
        'addressModel.firstName',
        'addressModel.lastName',
        'addressModel.postal',
        'addressModel.city',
        'addressModel.district',
      ];
      orders = filter.forKeys(keys, this.orders, this.filter);
    }

    orders = orders.sort((a, b) => new Date(b.dueAt) - new Date(a.dueAt));

    this.trigger(orders);
  },

});
