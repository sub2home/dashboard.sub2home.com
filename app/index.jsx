var React = require('react');
var Reflux = require('reflux');
var fastclick = require('fastclick');
var router = require('./config/router');
var api = require('./utils/api');
var session = require('./utils/session');

// polyfills
require('es6-promise').polyfill();
require('setimmediate');
require('fetch');

Reflux.nextTick(process.nextTick);

api.registerErrorHandler(function(error) {
  if (error.status === 401) {
    location.pathname = '/';
  }
});

router.run(function(Handler) {
  React.render(<Handler/>, document.body);
});

fastclick.attach(document.body);
