var React = require('react/addons');
var { State } = require('react-router');
var { timestampToTime, timestampToDate } = require('../../utils/date');
var actions = require('../../actions');
var OrderDetails = require('../OrderDetails');
var OrderCountdown = require('../OrderCountdown');

require('./index.less');

module.exports = React.createClass({

  mixins: [State],

  propTypes: {
    order: React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      showDetails: false,
    };
  },

  _toggleDetails: function() {
    var showDetails = !this.state.showDetails;
    this.setState({ showDetails });
  },

  render: function() {

    var details;
    if (this.state.showDetails) {
      details = (
        <OrderDetails order={this.props.order} />
      );
    }

    var now = new Date();
    var dueDate = new Date(this.props.order.dueAt);
    var delta = (dueDate - now) / 60000;
    var minimumDuration = this.props.order.deliveryAreaModel.minimumDuration;
    var status;
    if (delta >= 0 && delta <= minimumDuration) {
      status = (
        <OrderCountdown dueDate={dueDate} timespan={minimumDuration} />
      );
    } else if (delta > minimumDuration && delta <= minimumDuration + 10) {
      status = (
        <div className="orderStatus hot"></div>
      );
    } else {
      status = (
        <div className="orderStatus"></div>
      );
    }

    var isToday = dueDate.toDateString() === now.toDateString();
    var deliveryTime;
    if (isToday) {
      deliveryTime = timestampToTime(this.props.order.dueAt);
    } else {
      deliveryTime = timestampToDate(this.props.order.dueAt);
    }

    return (
      <li onClick={this._toggleDetails}>
        {status}
        <div className="orderDestination">
          <span className="orderOrderer">({this.props.order.id}) {this.props.order.addressModel.firstName} {this.props.order.addressModel.lastName}</span>
          <span className="orderDeliveryArea">{this.props.order.addressModel.postal} {this.props.order.addressModel.city} {this.props.order.addressModel.district ? '(' + this.props.order.addressModel.district + ')' : ''}</span>
        </div>
        <div className="orderDueTime">{deliveryTime}</div>
        {details}
      </li>
    );
  },

});

