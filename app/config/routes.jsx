var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var App = require('../components/App');
var Login = require('../components/Login');

module.exports = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Login}/>
  </Route>
);
