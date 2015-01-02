var React = require('react/addons');
var { timestampToTime } = require('../../utils/Date');
var OrdersActions = require('../../actions/OrdersActions');

require('./index.less');

module.exports = React.createClass({

  _toggleDelivered: function() {
    var isDelivered = !this.props.isDelivered;
    OrdersActions.updateOrder(this.props.id, {isDelivered});
  },

  render: function() {
    var orderStatusClasses = React.addons.classSet({
      orderStatus: true,
      delivered: this.props.isDelivered
    });
    return (
      <li>
        <div className={orderStatusClasses} onClick={this._toggleDelivered}></div>
        <div className="orderTime">{timestampToTime(this.props.createdAt)}</div>
        <div className="orderDestination">
          <span className="orderOrderer">{this.props.addressModel.firstName} {this.props.addressModel.lastName}</span>
          <span className="orderDeliveryArea">{this.props.addressModel.postal} {this.props.addressModel.city} {this.props.addressModel.district ? '(' + this.props.addressModel.district + ')' : ''}</span>
        </div>
        <div className="orderDueTime">{timestampToTime(this.props.dueAt)}</div>
        <div className="orderClaim icn iAlert"></div>
      </li>
    );
  },

});

