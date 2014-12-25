var React = require('react');

require('./index.less');

module.exports = React.createClass({
  render: function() {
    return (
      <header id="header">
        <div id="headerContent">
          <div id="headerActiveDeliveryTime">
            11:30-15:00
          </div>
          <div id="headerOutstandingOrder">
            <span className="counter">3</span>
            <span>offene Bestellungen</span>
          </div>
        </div>
      </header>
    );
  }
});
