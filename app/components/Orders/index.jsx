var React = require('react');
var Header = require('../Header');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <Header/>
        <div className="content">
          <ul id="ordersList" className="list">
            <li>
              <div className="orderStatus"></div>
              <div className="orderTime">11:30</div>
              <div className="orderDestination">
                <span className="orderOrderer">Schulze</span>
                <span className="orderDeliveryArea">87700 Benningen</span>
              </div>
              <div className="orderDueTime">12:00</div>
              <div className="orderClaim icn iAlert"></div>
            </li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    );
  }
});

