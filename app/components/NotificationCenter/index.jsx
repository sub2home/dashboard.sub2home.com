var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var actions = require('../../actions');

require('./index.less');

module.exports = React.createClass({

  propTypes: {
    notifications: React.PropTypes.array.isRequired,
  },

  _close: function(notification) {
    actions.removeNotification(notification);
  },

  render: function() {
    return (
      <div id="notificationCenter">
        <ReactCSSTransitionGroup transitionName="slide">
        {this.props.notifications.map(notification => (
          <div key={notification.id} className="notification">
            {notification.text}
            <div onClick={this._close.bind(this, notification)} className="icn iClose"></div>
          </div>
        ), this)}
        </ReactCSSTransitionGroup>
      </div>
    );
  },

});
