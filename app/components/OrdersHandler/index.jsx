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
      isFiltered: false,
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
    var pendingOrders;
    if (this.state.current.length + this.state.upcoming.length > 0) {
      pendingOrders = (
        <div>
          <ul id="ordersListCurrent" className="list">
            {this.state.current.map(order => <Order order={order} />)}
          </ul>
          <ul id="ordersListCurrent" className="list">
            {this.state.upcoming.map(order => <Order order={order} />)}
          </ul>
        </div>
      );
    } else if (!this.state.isFiltered) {
      pendingOrders = (
        <div className="ordersNone noCurrentOrders">
          Es liegen keine aktuellen Bestellungen vor.<span className="small">Beunruhigt? Senden Sie eine Testbestellung, um zu sehen, ob es an der Technik liegt:</span>
          <div id="sendTestMail" onClick={this._createTestOrder} className="icn iTestmail"></div>
        </div>
      );
    }

    var map;
    if (this.state.current.length > 0) {
      map = (
        <Map orders={this.state.current} store={this.state.store} />
      );
    }

    var todayOrders;
    if (this.state.today.length > 0) {
      todayOrders = (
        <ul id="ordersListToday" className="list">
          {this.state.today.map(order => <Order order={order} />)}
        </ul>
      );
    } else if (!this.state.isFiltered) {
      todayOrders = (
        <div className="ordersNone">Heute wurden noch keine Bestellungen ausgeliefert.</div>
      );
    }

    var oldOrders;
    if (this.state.old.length > 0) {
      oldOrders = (
        <ul id="ordersListOld" className="list">
          {this.state.old.map(order => <Order order={order} />)}
        </ul>
      );
    } else if (!this.state.isFiltered) {
      oldOrders = (
        <div className="ordersNone">Es sind keine älteren Bestellungen vorhanden.</div>
      );
    }

    return (
      <div>
        <Header nextDeliveryTime={this.state.nextDeliveryTime} orderCount={this.state.current.length + this.state.upcoming.length} />
        <div className="content">
          {map}
          <div className="ordersAreaLabel"><span>Aktuell</span></div>
          {pendingOrders}
          <div className="ordersAreaLabel"><span>Heute</span></div>
          {todayOrders}
          <div className="ordersAreaLabel"><span>Ältere Bestellungen</span></div>
          {oldOrders}
        </div>
      </div>
    );
  },

});
