var Reflux = require('reflux');
var OrdersActions = require('../actions/OrdersActions');
var Api = require('../utils/Api');

module.exports = Reflux.createStore({

  GET_ORDERS_ERROR: 1,

  listenables: OrdersActions,

  fetch: function(storeAlias) {
    var self = this;
    Api.get(`stores/${storeAlias}/orders`)
      .then(data => self.trigger(data))
      .catch(() => self.trigger(self.GET_ORDERS_ERROR));
  },

  sendTest: function(storeAlias) {
    Api.post('stores/memmingen/testorder').then(OrdersActions.fetch.bind(null, storeAlias));
  },

  updateOrder: function(id, data, storeAlias) {
    Api.put('orders/' + id, data).then(OrdersActions.fetch.bind(null, storeAlias));
  },

});
