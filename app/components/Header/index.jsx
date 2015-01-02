var React = require('react');
var OrdersActions = require('../../actions/OrdersActions');

require('./index.less');

module.exports = React.createClass({

  propTypes: {
    unreadOrders: React.PropTypes.number.isRequired,
  },

  _sendTest: function() {
    OrdersActions.sendTest();
  },

  render: function() {
    return (
      <header id="header">
        <div id="headerContent">
          <div id="headerActiveDeliveryTime">
            11:30-15:00
          </div>
          <div id="headerOutstandingOrders">
            <span className="counter">{this.props.unreadOrders}</span>
            <span>offene Bestellungen</span>
          </div>
          <div id="sendTestMail" onClick={this._sendTest} className="headerButton icn iMail emphasized">
          </div>
          <div id="logout" className="headerButton icn iNav">
          </div>
        </div>
      </header>
    );
  },

});
