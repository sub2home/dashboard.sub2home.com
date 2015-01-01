var React = require('react');
var { timestampToTime } = require('../../utils/Date');

require('./index.less');

module.exports = React.createClass({

  render: function() {
    return (
      <li>
        <div className="orderStatus"></div>
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

