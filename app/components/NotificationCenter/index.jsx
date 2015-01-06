var React = require('react');
var { State, Navigation } = require('react-router');
var actions = require('../../actions');
var NextDeliveryTime = require('../NextDeliveryTime');

require('./index.less');

module.exports = React.createClass({

  mixins: [State, Navigation],

  propTypes: {
    notifications: React.PropTypes.array.isRequired,
  },

  _logout: function() {
    actions.logout();
    this.replaceWith('/');
  },

  render: function() {
    return (
      <div id="notificationCenter">
        {this.props.notifications.map(notification => (
          <div className="notification">
            Dies ist ein Feedback, für etwas, das du gerade getan hast.
            <div className="icn iClose"></div>
          </div>
        ))}
      </div>
    );
  },

});
