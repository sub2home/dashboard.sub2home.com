var React = require('react');
var Reflux = require('reflux');
var fastclick = require('fastclick');
var router = require('./config/router');
var api = require('./utils/api');
var env = require('./utils/env');
var session = require('./utils/session');

// polyfills
require('es6-promise').polyfill();
require('setimmediate');
require('whatwg-fetch');

Reflux.nextTick(process.nextTick);

if (env.isProduction) {
  var analytics = require('./utils/analytics');
  var { token } = require('./config/segment');
  analytics.load(token);
  analytics.page();
}

api.registerErrorHandler(function(error) {
  if (error.status === 401) {
    session.logout();
    location.pathname = '/';
  }
});

router.run(function(Handler) {
  React.render(<Handler/>, document.body);
});

fastclick.attach(document.body);
