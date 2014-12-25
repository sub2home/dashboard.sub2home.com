var React = require('react');
var router = require('./config/router');

router.run(function (Handler) {
  React.render(<Handler/>, document.body);
});
