var React = require('react');
var Header = require('../Header');
var RouteHandler = require('react-router').RouteHandler;

require('./index.less');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <Header/>
        {/* this is the important part */}
        <RouteHandler/>
      </div>
    );
  }
});
