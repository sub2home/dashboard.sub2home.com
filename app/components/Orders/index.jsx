var React = require('react');
var { ListenerMixin } = require('reflux');
var { Navigation, State } = require('react-router');
var Header = require('../Header');
var Order = require('../Order');
var actions = require('../../actions');
var AuthStore = require('../../stores/AuthStore');
var ordersStore = require('../../stores/ordersStore');
var nextDeliveryTimeStore = require('../../stores/nextDeliveryTimeStore');

require('./index.less');

module.exports = React.createClass({

  mixins: [ListenerMixin, Navigation, State],

  getInitialState: function() {
    return {
      current: [],
      future: [],
      old: [],
      nextDeliveryTime: {
        deliveryTime: null,
        isNow: false,
      },
    };
  },

  componentWillMount: function() {
    if (!AuthStore.isLoggedIn()) {
      this.replaceWith('/');
    }

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
          {this.state.current.map(order => <Order {...order} />)}
        </ul>
      );
    } else {
      currentOrders = (
        <div id="sendTestMail" onClick={this._createTestOrder} className="headerButton icn iMail emphasized"></div>
      );
    }

    return (
      <div>
        <Header nextDeliveryTime={this.state.nextDeliveryTime} currentCount={this.state.current.length}/>
        <div className="content">
          <div id="ordersControls" className="note above">
            <div id="ordersSearch">
              <input type="text" onChange={this._onFilterChange} placeholder="Bestellungen durchsuchen" />
            </div>
            <div id="ordersRefresh" className="icn iNav"></div>
          </div>
          <h2>Current</h2>
          {currentOrders}
          <h2>Future</h2>
          <ul id="ordersList" className="list">
            {this.state.future.map(order => <Order {...order} />)}
          </ul>
          <h2>Old</h2>
          <ul id="ordersList" className="list">
            {this.state.old.map(order => <Order {...order} />)}
          </ul>
        </div>
      </div>
    );
  },

});
