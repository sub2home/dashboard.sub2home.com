var React = require('react');

require('./index.less');

module.exports = React.createClass({

  propTypes: {
    notifications: React.PropTypes.array.isRequired,
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
