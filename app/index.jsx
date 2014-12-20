var React = require('react');
var Header = require('./components/Header');

require('./less/main.less');

React.render(
  <Header />,
  document.getElementById('container')
);
