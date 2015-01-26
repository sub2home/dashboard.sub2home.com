var React = require('react/addons');
var { State } = require('react-router');
var { timestampToTime, timestampToDate, minutesToTime } = require('../../utils/date');
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
    var now = new Date();
    var dueDate = new Date(this.props.order.dueAt);
    var createdDate = new Date(this.props.order.createdAt);
    var dueDelta = (dueDate - now) / 60000;
    var createdDelta = (createdDate - now) / 60000;
    var minimumDuration = this.props.order.deliveryAreaModel.minimumDuration;
    var isToday = dueDate.toDateString() === now.toDateString();
    var isDifferentYear = dueDate.getFullYear() !== now.getFullYear();
    var isPending = dueDelta >= 0;
    var isCurrent = isPending && dueDelta <= minimumDuration;
    var isHot = dueDelta > minimumDuration && dueDelta <= minimumDuration + 5;
    var isNew = createdDelta < 0.5;
    var credit = this.props.order.creditModel;
    var hasCredit = !!credit;
    var hasWaitingCredit = hasCredit && !credit.isAccepted;
    var hasAcceptedCredit = hasCredit && credit.isAccepted;

    var cx = 'order';
    if (hasWaitingCredit) {
      cx += ' hasWaitingCredit';
    } else if (hasAcceptedCredit) {
      cx += ' hasAcceptedCredit';
    } else if (isCurrent) {
      cx += ' isCurrent';
    } else if (isHot) {
      cx += ' isHot';
    } else if (isNew) {
      cx += ' isNew';
    }

    var deliveryTime;
    if (!hasCredit & isPending && !isCurrent) {
      deliveryTime = (
        <div className="orderDueTime">{timestampToTime(this.props.order.dueAt)}<span className="orderTimeToDueTime">(in {minutesToTime(dueDelta)})</span></div>
      );
    } else if (isToday) {
      deliveryTime = (
        <div className="orderDueTime">{timestampToTime(this.props.order.dueAt)}</div>
      );
    } else if (isDifferentYear) {
      deliveryTime = (
        <div className="orderDueTime orderDueDateFullFormat">{timestampToDate(this.props.order.dueAt)}</div>
      );
    } else {
      deliveryTime = (
        <div className="orderDueTime orderDueDate">{timestampToDate(this.props.order.dueAt)}</div>
      );
    }

    var status;
    if (!hasCredit && isCurrent) {
      status = (
        <OrderCountdown dueDate={dueDate} timespan={minimumDuration} />
      );
    } else if (!hasCredit && isPending) {
      status = (
        <div className="orderCountdown waiting">
          <div className="orderCountdownContainer">
            <svg width="47" height="47">
              <circle className="orderCountdownStroke" cx="23.5" cy="23.5" r="20" />
            </svg>
            <div className="orderCountdownNumber">{minimumDuration}</div>
          </div>
        </div>
      );
    } else {
      status = (
        <div className="orderStatus"></div>
      );
    }

    var details;
    if (this.state.showDetails) {
      details = (
        <OrderDetails order={this.props.order} />
      );
    }

    return (
      <li className={cx}>
        <div className="orderHeader" onClick={this._toggleDetails}>
          {status}
          <div className="orderDestination">
            <span className="orderOrderer">{this.props.order.addressModel.firstName} {this.props.order.addressModel.lastName}</span>
            <span className="orderDeliveryArea">{this.props.order.addressModel.postal} {this.props.order.addressModel.city} {this.props.order.addressModel.district ? '(' + this.props.order.addressModel.district + ')' : ''}</span>
          </div>
          {deliveryTime}
        </div>
        {details}
      </li>
    );
  },

});

