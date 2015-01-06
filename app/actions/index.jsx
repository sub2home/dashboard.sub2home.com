var Reflux = require('reflux');
var api = require('../utils/api');

var actions = Reflux.createActions([
  // notifications
  'pushNotification',
  'removeNotification',
  // auth
  'login',
  'loginSuccess',
  'loginError',
  'logout',
  // deliveryTimes
  'fetchDeliveryTimes',
  'deliveryTimesUpdated',
  // orders
  'listenToOrders',
  'fetchOrders',
  'setOrdersFilter',
  'ordersUpdated',
  'createTestOrder',
  'updateOrder',
  // stores
  'fetchStores',
  'storesUpdated',
  'fetchStore',
  'storeUpdated',
]);


/*
 * auth actions
 */
actions.login.listen(function(number, password) {
  api.post('login', {number, password}, { disableErrorHandlers: true })
    .then(function(data) {
      localStorage.setItem('token', data.token);
      actions.loginSuccess();
    })
    .catch(actions.loginError);
});

actions.logout.listen(function() {
  localStorage.removeItem('token');
});


/*
 * deliveryTime actions
 */
actions.fetchDeliveryTimes.listen(function(storeAlias) {
  api.get(`stores/${storeAlias}/auth`).then(data => actions.deliveryTimesUpdated(data.deliveryTimesCollection));
});


/*
 * order actions
 */
actions.listenToOrders.listen(function(storeAlias) {
  actions.fetchOrders(storeAlias);
  setInterval(actions.fetchOrders.bind(null, storeAlias), 5000);
});

actions.fetchOrders.listen(function(storeAlias) {
  api.get(`stores/${storeAlias}/orders`).then(actions.ordersUpdated);
});

actions.createTestOrder.listen(function(storeAlias) {
  api.post(`stores/${storeAlias}/testorder`).then(actions.fetchOrders.bind(null, storeAlias));
});

actions.updateOrder.listen(function(id, data, storeAlias) {
  api.put(`orders/${id}`, data).then(actions.fetchOrders.bind(null, storeAlias));
});


/*
 * stores actions
 */
actions.fetchStores.listen(function() {
  api.get('clients').then(data => actions.storesUpdated(data.storesCollection));
});

actions.fetchStore.listen(function(storeAlias) {
  api.get(`stores/${storeAlias}/auth`).then(actions.storeUpdated);
});


module.exports = actions;
