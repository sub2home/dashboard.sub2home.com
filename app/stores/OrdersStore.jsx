var Reflux = require('reflux');
var OrdersActions = require('../actions/OrdersActions');
var Api = require('../utils/Api');

module.exports = Reflux.createStore({

  listenables: OrdersActions,

  list: function(storeAlias) {
    Api.get(`stores/${storeAlias}/orders`).then(this.trigger.bind(this));
  },

  sendTest: function(storeAlias) {
    Api.post(`stores/${storeAlias}/testorder`).then(OrdersActions.list.bind(null, storeAlias));
  },

  updateOrder: function(id, data, storeAlias) {
    Api.put(`orders/${id}`, data).then(OrdersActions.list.bind(null, storeAlias));
  },

});
