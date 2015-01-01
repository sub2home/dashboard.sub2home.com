var React = require('react');
var Header = require('../Header');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <Header/>
        <h1>Just a list</h1>
      </div>
    );
  }
});

