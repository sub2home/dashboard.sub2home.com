var React = require('react/addons');

require('./index.less');

module.exports = React.createClass({

  propTypes: {
    dueDate: React.PropTypes.object.isRequired,
    timespan: React.PropTypes.number.isRequired,
  },

  render: function() {
    var minutesRemaining = (this.props.dueDate - new Date()) / 60000;
    var progress = minutesRemaining / this.props.timespan;
    var radius = 20;
    var full = 2 * radius * Math.PI;
    var dasharray = full;
    var dashoffset = (1 - progress) * full;

    var orderCountdownCx = React.addons.classSet({
      orderCountdown: true,
      urgent: progress <= 0.2,
    });

    return (
      <div className={orderCountdownCx}>
        <div className="orderCountdownContainer fix-tc">
          <svg width="50" height="50">
            <circle className="orderCountdownBackground" cx="25" cy="25" r="20" />
          </svg>
          <svg width="50" height="50">
            <circle className="orderCountdownStroke" style={{strokeDashoffset: dashoffset + 'px'}} strokeDasharray={dasharray + 'px'} cx="25" cy="25" r="20" />
          </svg>
          <div className="orderCountdownNumber">{parseInt(minutesRemaining + 1, 10)}</div>
        </div>  
      </div>
    );
  },

});
