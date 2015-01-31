var React = require('react/addons');
var { State, Navigation } = require('react-router');
var actions = require('../../actions');
var NextDeliveryTime = require('../NextDeliveryTime');

require('./index.less');

module.exports = React.createClass({

  mixins: [State, Navigation],

  propTypes: {
    orderCount: React.PropTypes.number.isRequired,
    nextDeliveryTime: React.PropTypes.shape({
      deliveryTime: React.PropTypes.object.isRequired,
      isNow: React.PropTypes.bool.isRequired,
    }),
  },

  getInitialState: function() {
    return {
      filterToggled: false,
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (!prevState.filterToggled && this.state.filterToggled) {
      this.refs.filter.getDOMNode().focus();
    }
  },

  _logout: function() {
    actions.logout();
    this.replaceWith('/');
  },

  _onFilterChange: function(e) {
    actions.setOrdersFilter(e.target.value);
  },

  _onFilterKeyUp: function(e) {
    if (e.keyCode === 27) {
      this._toggleFilter();
    }
  },

  _toggleFilter: function() {
    var filterToggled = !this.state.filterToggled;
    this.setState({ filterToggled });

    if (!filterToggled) {
      actions.setOrdersFilter('');
    }
  },

  render: function() {
    var orderStatusCx = React.addons.classSet({
      filterToggled: this.state.filterToggled,
    });

    var filterOrInfo;
    if (this.state.filterToggled) {
      filterOrInfo = (
        <div id="headerFilterOrders" className="emphasized">
          <input ref="filter" type="text" onKeyUp={this._onFilterKeyUp} onChange={this._onFilterChange} placeholder="Bestellungen filtern" />
        </div>
      );
    } else {
      var plural = this.props.orderCount === 1 ? '' : 'en';
      filterOrInfo = (
        <div id="headerOutstandingOrders">
          <span className="counter">{this.props.orderCount}</span>
          <span>aktuelle Bestellung{plural}</span>
        </div>
      );
    }

    var nextDeliveryTime;
    if (window.innerWidth >= 450) {
      nextDeliveryTime = (
        <NextDeliveryTime isNow={this.props.nextDeliveryTime.isNow} deliveryTime={this.props.nextDeliveryTime.deliveryTime} />
      );
    }

    return (
      <header id="header" className={orderStatusCx}>
        <div id="headerContent">
          {nextDeliveryTime}
          {filterOrInfo}
          <div id="headerToggleFilterOrders" onClick={this._toggleFilter} className="headerButton icn iSearch emphasized"></div>
          <div id="logout" onClick={this._logout} className="headerButton icn iSignOut">
          </div>
        </div>
      </header>
    );
  },

});
