var React = require('react');
var { ListenerMixin } = require('reflux');
var { Navigation, State } = require('react-router');
var Header = require('../Header');
var Order = require('../Order');
var OrdersActions = require('../../actions/OrdersActions');
var AuthStore = require('../../stores/AuthStore');
var OrdersStore = require('../../stores/OrdersStore');

require('./index.less');

module.exports = React.createClass({

  mixins: [ListenerMixin, Navigation, State],

  getInitialState: function() {
    return {
      orders: [],
    };
  },

  componentDidMount: function() {
    if (!AuthStore.isLoggedIn()) {
      this.replaceWith('/');
    }
    this.listenTo(OrdersStore, this._onOrdersChange);
  },

  componentWillMount: function() {
    var { storeAlias } = this.getParams();
    OrdersActions.fetch(storeAlias);
  },

  _onOrdersChange: function(orders) {
    this.setState({orders});
  },

  render: function() {
    return (
      <div>
        <Header unreadOrders={this.state.orders.reduce((acc, order) => acc + !order.isDelivered, 0)}/>
        <div className="content">
          <ul id="ordersList" className="list">
            {this.state.orders.map(order => <Order {...order} />)}
          </ul>
        </div>
      </div>
    );
  },

});
