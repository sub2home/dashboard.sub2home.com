var React = require('react');
var { ListenerMixin } = require('reflux');
var { Navigation, State } = require('react-router');
var Header = require('../Header');
var Order = require('../Order');
var actions = require('../../actions');
var AuthStore = require('../../stores/AuthStore');
var ordersStore = require('../../stores/ordersStore');
var StoresStore = require('../../stores/StoresStore');

require('./index.less');

module.exports = React.createClass({

  mixins: [ListenerMixin, Navigation, State],

  getInitialState: function() {
    return {
      current: [],
      future: [],
      old: [],
      nextDeliveryTime: null,
    };
  },

  componentWillMount: function() {
    if (!AuthStore.isLoggedIn()) {
      this.replaceWith('/');
    }

    this.listenTo(ordersStore, this._onOrdersUpdate);
    //this.listenTo(sStore, this._onsChange);

    var { storeAlias } = this.getParams();
    actions.listenToOrders(storeAlias);
  },

  _onOrdersUpdate: function(data) {
    this.setState(data);
  },

  _onFilterChange: function(e) {
    actions.setOrdersFilter(e.target.value);
  },

  render: function() {
    return (
      <div>
        <Header nextDeliveryTime={this.state.nextDeliveryTime} currentCount={this.state.current.length}/>
        <div className="content">
          <div id="ordersControls" className="note above">
           <div id="ordersSearch">
             <input type="text" onChange={this._onFilterChange} placeholder="Bestellungen durchsuchen" />
           </div>
            <div id="ordersRefresh" className="icn iNav"></div>
          </div>
          <h2>Current</h2>
          <ul id="ordersList" className="list">
            {this.state.current.map(order => <Order {...order} />)}
          </ul>
          <h2>Future</h2>
          <ul id="ordersList" className="list">
            {this.state.future.map(order => <Order {...order} />)}
          </ul>
          <h2>Old</h2>
          <ul id="ordersList" className="list">
            {this.state.old.map(order => <Order {...order} />)}
          </ul>
        </div>
      </div>
    );
  },

});
