var React = require('react');
var Header = require('../Header');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <Header/>
        <ul>
          <li>An order 1</li>
          <li>An order 2</li>
          <li>An order 3</li>
          <li>An order 4</li>
          <li>An order 5</li>
        </ul>
      </div>
    );
  }
});

