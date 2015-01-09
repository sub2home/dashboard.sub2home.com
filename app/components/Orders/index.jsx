var React = require('react');
var { ListenerMixin } = require('reflux');
var { Navigation, State } = require('react-router');
var Header = require('../Header');
var Order = require('../Order');
var Map = require('../Map');
var actions = require('../../actions');
var ordersStore = require('../../stores/ordersStore');
var nextDeliveryTimeStore = require('../../stores/nextDeliveryTimeStore');

require('./index.less');

module.exports = React.createClass({

  mixins: [ListenerMixin, Navigation, State],

  getInitialState: function() {
    return {
      store: null,
      current: [],
      upcoming: [],
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
    this.listenTo(actions.storeUpdated, this._onStoreChange);

    var { storeAlias } = this.getParams();
    actions.listenToOrders(storeAlias);
    actions.fetchDeliveryTimes(storeAlias);
    actions.fetchStore(storeAlias);
  },

  _onOrdersUpdate: function(data) {
    this.setState(data);
  },

  _onStoreChange: function(store) {
    this.setState({ store });
  },

  _onNextDeliveryTimeChange: function(nextDeliveryTime) {
    this.setState({ nextDeliveryTime });
  },

  _createTestOrder: function() {
    var { storeAlias } = this.getParams();
    actions.createTestOrder(storeAlias);
  },

  render: function() {
    var currentOrders;
    if (this.state.current.length > 0) {
      currentOrders = (
        <div>
          <Map orders={this.state.current} store={this.state.store} />
          <div className="ordersAreaLabel"><span>Aktuell</span></div>
          <ul id="ordersList" className="list">
            {this.state.current.map(order => <Order order={order} />)}
          </ul>
          <ul id="ordersList" className="list">
            {this.state.upcoming.map(order => <Order order={order} />)}
          </ul>
        </div>
      );
    } else {
      currentOrders = (
        <div id="sendTestMail" onClick={this._createTestOrder} className="icn iMail"></div>
      );
    }

    return (
      <div>
        <Header nextDeliveryTime={this.state.nextDeliveryTime} orderCount={this.state.current.length + this.state.upcoming.length} />
        <div className="content">
          {currentOrders}
          <div className="ordersAreaLabel"><span>Heute</span></div>
          <ul id="ordersList" className="list">
            {this.state.today.map(order => <Order order={order} />)}
          </ul>
          <div className="ordersAreaLabel"><span>Ältere Bestellungen</span></div>
          <ul id="ordersList" className="list">
            {this.state.old.map(order => <Order order={order} />)}
          </ul>
        </div>
      </div>
    );
  },

});
