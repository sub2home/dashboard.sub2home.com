var React = require('react');
var { create, DefaultRoute, Route, NotFoundRoute, HistoryLocation } = require('react-router');
var AppHandler = require('../components/AppHandler');
var LoginHandler = require('../components/LoginHandler');
var OrdersHandler = require('../components/OrdersHandler');

var routes = (
  <Route name="app" path="/" handler={AppHandler}>
    <Route name="orders" path=":storeAlias" handler={OrdersHandler}/>
    <DefaultRoute handler={LoginHandler}/>
  </Route>
);

module.exports = create({
  routes: routes,
  location: HistoryLocation
});
