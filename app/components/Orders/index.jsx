var React = require('react');
var Header = require('../Header');
var { Navigation } = require('react-router');
var AuthStore = require('../../stores/AuthStore');

module.exports = React.createClass({

  mixins: [Navigation],

  componentDidMount: function() {
    if (!AuthStore.isLoggedIn()) {
      this.replaceWith('/');
      return;
    }
  },

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
  },

});
