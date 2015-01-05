var React = require('react');
var { State, Navigation } = require('react-router');
var actions = require('../../actions');
var NextDeliveryTime = require('../NextDeliveryTime');

require('./index.less');

module.exports = React.createClass({

  mixins: [State, Navigation],

  propTypes: {
    currentCount: React.PropTypes.number.isRequired,
    nextDeliveryTime: React.PropTypes.shape({
      deliveryTime: React.PropTypes.object.isRequired,
      isNow: React.PropTypes.bool.isRequired,
    }),
  },

  _logout: function() {
    actions.logout();
    this.replaceWith('/');
  },

  render: function() {
    return (
      <header id="header">
        <div id="headerContent">
          <NextDeliveryTime isNow={this.props.nextDeliveryTime.isNow} deliveryTime={this.props.nextDeliveryTime.deliveryTime} />
          <div id="headerOutstandingOrders">
            <span className="counter">{this.props.currentCount}</span>
            <span>aktuelle Bestellungen</span>
          </div>
          <div id="sendTestMail" className="headerButton icn iMail emphasized"></div>
          <div id="logout" onClick={this._logout} className="headerButton icn iNav">
          </div>
        </div>
        
        <div id="notificationCenter">
          <div className="notification">
            Dies ist ein Feedback, für etwas, das du gerade getan hast.
            <div className="icn iClose"></div>
          </div>
          <div className="notification">
            Dies ist noch ein Feedback.
            <div className="icn iClose"></div>
          </div>
        </div>
      
      </header>
      
    );
  },

});
