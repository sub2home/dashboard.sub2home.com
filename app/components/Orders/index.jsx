var React = require('react');
var { ListenerMixin } = require('reflux');
var { Navigation, State } = require('react-router');
var Header = require('../Header');
var Order = require('../Order');
var actions = require('../../actions');
var ordersStore = require('../../stores/ordersStore');
var nextDeliveryTimeStore = require('../../stores/nextDeliveryTimeStore');

require('./index.less');

module.exports = React.createClass({

  mixins: [ListenerMixin, Navigation, State],

  getInitialState: function() {
    return {
      current: [],
      today: [],
      old: [],
      nextDeliveryTime: {
        deliveryTime: null,
        isNow: false,
      },
    };
  },

  componentWillMount: function() {
    this.listenTo(ordersStore, this._onOrdersUpdate);
    this.listenTo(nextDeliveryTimeStore, this._onNextDeliveryTimeChange);

    var { storeAlias } = this.getParams();
    actions.listenToOrders(storeAlias);
    actions.fetchDeliveryTimes(storeAlias);
  },

  _onOrdersUpdate: function(data) {
    this.setState(data);
  },

  _onNextDeliveryTimeChange: function(nextDeliveryTime) {
    this.setState({ nextDeliveryTime });
  },

  _onFilterChange: function(e) {
    actions.setOrdersFilter(e.target.value);
  },

  _createTestOrder: function() {
    var { storeAlias } = this.getParams();
    actions.createTestOrder(storeAlias);
  },

  render: function() {
    var currentOrders;
    if (this.state.current.length > 0) {
      currentOrders = (
        <ul id="ordersList" className="list">
          {this.state.current.map(order => <Order group="current" order={order} />)}
        </ul>
      );
    } else {
      currentOrders = (
        <div id="sendTestMail" onClick={this._createTestOrder} className="icn iMail"></div>
      );
    }

    return (
      <div>
        <Header nextDeliveryTime={this.state.nextDeliveryTime} currentCount={this.state.current.length}/>
        <div className="content">
          <div id="ordersControls" className="note above">
            <div id="ordersSearch">
              <input type="text" onChange={this._onFilterChange} placeholder="Bestellungen filtern" />
            </div>
            <div id="ordersRefresh" className="icn iNav"></div>
          </div>
          <div className="ordersAreaLabel"><span>Aktuell</span></div>
          {currentOrders}
          <div className="ordersAreaLabel"><span>Heute</span></div>
          <ul id="ordersList" className="list">
            {this.state.today.map(order => <Order group="today" order={order} />)}
          </ul>
          <div className="ordersAreaLabel"><span>Ältere Bestellungen</span></div>
          <ul id="ordersList" className="list">
            {this.state.old.map(order => <Order group="old" order={order} />)}
          </ul>
        </div>
      </div>
    );
  },

});
