var React = require('react');
var { State } = require('react-router');
var actions = require('../../actions');
var NextDeliveryTime = require('../NextDeliveryTime');

require('./index.less');

module.exports = React.createClass({

  mixins: [State],

  propTypes: {
    currentCount: React.PropTypes.number.isRequired,
    nextDeliveryTime: React.PropTypes.shape({
      deliveryTime: React.PropTypes.object.isRequired,
      isNow: React.PropTypes.bool.isRequired,
    }),
  },

  _sendTest: function() {
    var { storeAlias } = this.getParams();
    actions.createTestOrder(storeAlias);
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
          <div id="sendTestMail" onClick={this._sendTest} className="headerButton icn iMail emphasized"></div>
          <div id="logout" className="headerButton icn iNav">
          </div>
        </div>
      </header>
    );
  },

});
