var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

require('./index.less');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <RouteHandler/>
      </div>
    );
  }
});
