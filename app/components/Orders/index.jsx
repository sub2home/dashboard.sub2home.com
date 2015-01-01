var React = require('react');
var { ListenerMixin } = require('reflux');
var { Navigation } = require('react-router');
var Header = require('../Header');
var OrdersActions = require('../../actions/OrdersActions');
var AuthStore = require('../../stores/AuthStore');
var OrdersStore = require('../../stores/OrdersStore');

require('./index.less');

module.exports = React.createClass({

  mixins: [ListenerMixin, Navigation],

  getInitialState: function() {
    return {
      orders: [],
    };
  },

  componentDidMount: function() {
    if (!AuthStore.isLoggedIn()) {
      this.replaceWith('/');
      return;
    }
    this.listenTo(OrdersStore, this._onOrdersChange);
  },

  componentWillMount: function() {
    OrdersActions.fetchOrders();
  },

  _onOrdersChange: function(orders) {
    this.setState({orders});
  },

  render: function() {
    return (
      <div>
        <Header/>
        <div className="content">
          <ul id="ordersList" className="list">
            {this.state.orders.map(order => (
              <li>
                <div className="orderStatus"></div>
                <div className="orderTime">11:30</div>
                <div className="orderDestination">
                  <span className="orderOrderer">Schulze</span>
                  <span className="orderDeliveryArea">87700 Benningen</span>
                </div>
                <div className="orderDueTime">12:00</div>
                <div className="orderClaim icn iAlert"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },

});
