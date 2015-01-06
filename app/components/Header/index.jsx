var React = require('react/addons');
var { State, Navigation } = require('react-router');
var actions = require('../../actions');
var NextDeliveryTime = require('../NextDeliveryTime');

require('./index.less');

module.exports = React.createClass({

  mixins: [State, Navigation],

  getInitialState: function() {
    return {
      filterToggled: false,
    };
  },

  propTypes: {
    currentCount: React.PropTypes.number.isRequired,
    nextDeliveryTime: React.PropTypes.shape({
      deliveryTime: React.PropTypes.object.isRequired,
      isNow: React.PropTypes.bool.isRequired,
    }),
  },

  _logout: function() {
    actions.logout();
    this.replaceWith('/');
  },

  _onFilterChange: function(e) {
    actions.setOrdersFilter(e.target.value);
  },

  _toggleFilter: function() {
    var filterToggled = !this.state.filterToggled;
    this.setState({ filterToggled });
  },

  render: function() {
    var orderStatusCx = React.addons.classSet({
      filterToggled: this.state.filterToggled,
    });

    var filterOrInfo;
    if (this.state.filterToggled) {
      filterOrInfo = (
          <div id="headerFilterOrders" className="emphasized">
            <input type="text" onChange={this._onFilterChange} placeholder="Bestellungen filtern" />
          </div>
      );
    } else {
      filterOrInfo = (
        <div id="headerOutstandingOrders">
          <span className="counter">{this.props.currentCount}</span>
          <span>aktuelle Bestellungen</span>
        </div>
      );
    }

    return (
      <header id="header" className={orderStatusCx}>
        <div id="headerContent">
          <NextDeliveryTime isNow={this.props.nextDeliveryTime.isNow} deliveryTime={this.props.nextDeliveryTime.deliveryTime} />
          {filterOrInfo}
          <div id="headerToggleFilterOrders" onClick={this._toggleFilter} className="headerButton icn iFire iSearch emphasized"></div>
          <div id="logout" onClick={this._logout} className="headerButton icn iNav">
          </div>
        </div>
      </header>
    );
  },

});
