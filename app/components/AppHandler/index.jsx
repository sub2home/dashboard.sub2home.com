var React = require('react');
var { ListenerMixin } = require('reflux');
var { RouteHandler } = require('react-router');
var NotificationCenter = require('../NotificationCenter');
var notificationsStore = require('../../stores/notificationsStore');

require('./index.less');

module.exports = React.createClass({

  mixins: [ListenerMixin],

  getInitialState: function() {
    return {
      notifications: [],
    };
  },

  componentWillMount: function() {
    this.listenTo(notificationsStore, this._onNotificationsUpdate);
  },

  _onNotificationsUpdate: function(notifications) {
    this.setState({ notifications });
  },

  render: function() {
    return (
      <div>
        <NotificationCenter notifications={this.state.notifications} />
        <RouteHandler />
      </div>
    );
  },

});
