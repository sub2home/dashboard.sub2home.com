var React = require('react/addons');
var { State } = require('react-router');
var { timestampToTime } = require('../../utils/date');
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
      isLoading: false,
      showDetails: false,
    };
  },

  componentWillReceiveProps: function() {
    if (this.state.isLoading) {
      this.setState({ isLoading: false });
    }
  },

  _toggleDelivered: function() {
    this.setState({isLoading: true});
    var isDelivered = !this.props.order.isDelivered;
    var { storeAlias } = this.getParams();
    actions.updateOrder(this.props.order.id, { isDelivered }, storeAlias);
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
    var isToday = dueDate.toDateString() === now.toDateString();
    var status;
    if (delta >= 0 && delta <= minimumDuration) {
      status = (
        <OrderCountdown dueDate={new Date(this.props.order.dueAt)} timespan={this.props.order.deliveryAreaModel.minimumDuration} />
      );
    } else if (delta > minimumDuration && delta <= minimumDuration + 10) {
      status = (
        <div className="orderStatus upcoming"></div>
      );
    } else {
      var orderStatusClasses = React.addons.classSet({
        orderStatus: true,
        isDelivered: this.props.order.isDelivered,
        isLoading: this.state.isLoading,
      });

      status = (
        <div className={orderStatusClasses} onClick={this._toggleDelivered}></div>
      );
    }

    return (
      <li onClick={this._toggleDetails}>
        {status}
        <div className="orderDestination">
          <span className="orderOrderer">({this.props.order.id}) {this.props.order.addressModel.firstName} {this.props.order.addressModel.lastName}</span>
          <span className="orderDeliveryArea">{this.props.order.addressModel.postal} {this.props.order.addressModel.city} {this.props.order.addressModel.district ? '(' + this.props.order.addressModel.district + ')' : ''}</span>
        </div>
        <div className="orderDueTime">{timestampToTime(this.props.order.dueAt)}</div>
        {details}
      </li>
    );
  },

});

