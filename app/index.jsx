var React = require('react');
var Reflux = require('reflux');
var router = require('./config/router');

// polyfills
require('es6-promise').polyfill();
require('setimmediate');
require('fetch');

Reflux.nextTick(process.nextTick);

router.run(function(Handler) {
  React.render(<Handler/>, document.body);
});
