var React = require('react');
var { create, DefaultRoute, Route, NotFoundRoute, HistoryLocation } = require('react-router');
var App = require('../components/App');
var Login = require('../components/Login');
var Orders = require('../components/Orders');

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="orders" path=":storeAlias" handler={Orders}/>
    <DefaultRoute handler={Login}/>
  </Route>
);

module.exports = create({
  routes: routes,
  location: HistoryLocation
});
