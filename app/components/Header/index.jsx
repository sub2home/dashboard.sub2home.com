var React = require('react');
var { State } = require('react-router');
var actions = require('../../actions');

require('./index.less');

module.exports = React.createClass({

  mixins: [State],

  propTypes: {
    unreadOrders: React.PropTypes.number.isRequired,
  },

  _sendTest: function() {
    var { storeAlias } = this.getParams();
    actions.sendTest(storeAlias);
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
