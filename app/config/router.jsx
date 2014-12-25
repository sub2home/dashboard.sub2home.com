var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var App = require('../components/App');
var Login = require('../components/Login');
var List = require('../components/List');

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="list" handler={List}/>
    <DefaultRoute handler={Login}/>
  </Route>
);

module.exports = Router.create({
  routes: routes,
  location: Router.HistoryLocation
});
