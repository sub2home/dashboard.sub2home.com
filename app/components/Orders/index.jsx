var React = require('react');
var { ListenerMixin } = require('reflux');
var { Navigation } = require('react-router');
var Header = require('../Header');
var OrdersActions = require('../../actions/OrdersActions');
var AuthStore = require('../../stores/AuthStore');
var OrdersStore = require('../../stores/OrdersStore');
var { timestampToTime } = require('../../utils/Date');

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
                <div className="orderTime">{timestampToTime(order.createdAt)}</div>
                <div className="orderDestination">
                  <span className="orderOrderer">{order.addressModel.firstName} {order.addressModel.lastName}</span>
                  <span className="orderDeliveryArea">{order.addressModel.postal} {order.addressModel.city} {order.addressModel.district ? '(' + order.addressModel.district + ')' : ''}</span>
                </div>
                <div className="orderDueTime">{timestampToTime(order.dueAt)}</div>
                <div className="orderClaim icn iAlert"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },

});
