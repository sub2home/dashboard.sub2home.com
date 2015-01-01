var Reflux = require('reflux');
var OrdersActions = require('../actions/OrdersActions');
var Api = require('../utils/Api');

module.exports = Reflux.createStore({

  GET_ORDERS_ERROR: 1,

  listenables: OrdersActions,

  fetchOrders: function() {
    Api.get('stores/memmingen')
      .then(data => self.trigger(data))
      .catch(() => self.trigger(this.GET_ORDERS_ERROR));
  },

});
