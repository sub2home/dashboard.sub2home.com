var React = require('react');
var actions = require('../../actions');
var { minutesToTime } = require('../../utils/date');

require('./index.less');

module.exports = React.createClass({

  propTypes: {
    deliveryTime: React.PropTypes.object.isRequired,
    isNow: React.PropTypes.bool.isRequired,
  },

  render: function() {
    var timeString = '';
    if (this.props.deliveryTime) {
      timeString = minutesToTime(this.props.deliveryTime.startMinutes) + '-' + minutesToTime(this.props.deliveryTime.endMinutes);
    }

    return (
      <div id="headerActiveDeliveryTime" className={this.props.isNow ? 'open' : ''}>{timeString}</div>
    );
  },

});

