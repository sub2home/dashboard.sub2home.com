var Reflux = require('reflux');
var api = require('../utils/api');

var actions = Reflux.createActions([
  // auth
  'login',
  'logout',
  // orders
  'listenToOrders',
  'fetchOrders',
  'setOrdersFilter',
  'ordersUpdated',
  'sendTest',
  'updateOrder',
  // stores
  'list',
]);

actions.listenToOrders.listen(function(storeAlias) {
  actions.fetchOrders(storeAlias);
  setInterval(actions.fetchOrders.bind(null, storeAlias), 5000);
});

actions.fetchOrders.listen(function(storeAlias) {
  api.get(`stores/${storeAlias}/orders`).then(actions.ordersUpdated);
});

actions.sendTest.listen(function(storeAlias) {
  api.post(`stores/${storeAlias}/testorder`).then(actions.fetchOrders.bind(null, storeAlias));
});

actions.updateOrder.listen(function(id, data, storeAlias) {
  api.put(`orders/${id}`, data).then(actions.list.bind(null, storeAlias));
});

module.exports = actions;
