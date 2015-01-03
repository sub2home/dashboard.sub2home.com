var React = require('react');
var { ListenerMixin } = require('reflux');
var { Navigation, State } = require('react-router');
var Header = require('../Header');
var Order = require('../Order');
var actions = require('../../actions');
var AuthStore = require('../../stores/AuthStore');
var ordersStore = require('../../stores/ordersStore');
var StoresStore = require('../../stores/StoresStore');

require('./index.less');

module.exports = React.createClass({

  mixins: [ListenerMixin, Navigation, State],

  getInitialState: function() {
    return {
      orders: [],
      nextDeliveryTime: null,
    };
  },

  componentDidMount: function() {
    if (!AuthStore.isLoggedIn()) {
      this.replaceWith('/');
    }
    this.listenTo(ordersStore, this._onOrdersUpdate);
    //this.listenTo(sStore, this._onsChange);
  },

  componentWillMount: function() {
    var { storeAlias } = this.getParams();
    actions.listenToOrders(storeAlias);
  },

  _onOrdersUpdate: function(orders) {
    this.setState({orders});
  },

  _onFilterChange: function(e) {
    actions.setOrdersFilter(e.target.value);
  },

  render: function() {
    return (
      <div>
        <Header nextDeliveryTime={this.state.nextDeliveryTime} unreadOrders={this.state.orders.reduce((acc, order) => acc + !order.isDelivered, 0)}/>
        <div className="content">
          <div id="ordersControls" className="note above">
           <div id="ordersSearch">
             <input type="text" onChange={this._onFilterChange} placeholder="Bestellungen durchsuchen" />
           </div>
            <div id="ordersRefresh" className="icn iNav"></div>
          </div>
          <ul id="ordersList" className="list">
            {this.state.orders.map(order => <Order {...order} />)}
          </ul>
        </div>
      </div>
    );
  },

});
