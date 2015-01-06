var React = require('react');
var _ = require('lodash');
var OrderCountdown = require('../OrderCountdown');
var config = require('../../config/mapbox');

require('mapbox.js');

require('style!css!mapbox.js/theme/style.css');
require('./index.less');

var toCoords = x => [x.addressModel.latitude, x.addressModel.longitude];

module.exports = React.createClass({

  _map: null,

  propTypes: {
    orders: React.PropTypes.array.isRequired,
    store: React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      initialized: false,
    };
  },

  componentDidUpdate: function() {
    this._checkInitialized();
  },

  componentDidMount: function () {
    this._checkInitialized();
  },

  _checkInitialized: function() {
    if (!this.state.initialized && this.props.orders && this.props.store) {
      L.mapbox.accessToken = config.token;

      var options = {
        zoomControl: false,
        attributionControl: false,
      };
      var map = this._map = L.mapbox.map(this.refs.map.getDOMNode(), config.style, options);

      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();

      this.setState({ initialized: true });
    }
  },

  _alignMap: function() {
    var latlngs = this.props.orders.concat([this.props.store]).map(toCoords);
    var bounds = L.latLngBounds(latlngs);

    this._map.fitBounds(bounds, { padding: [40, 40] });
  },

  render: function() {
    var markers;

    if (this.state.initialized) {
      this._alignMap();

      var toOffset = x => this._map.latLngToLayerPoint([x.addressModel.latitude, x.addressModel.longitude]);
      var storeOffset = toOffset(this.props.store);
      var orderOffsets = this.props.orders.map(toOffset);
      var zippedOrders = _.zip(this.props.orders, orderOffsets);

      // markers to state
      markers = (
        <div>
          <div id="mapStoreMarker" style={{top: storeOffset.y + 'px', left: storeOffset.x + 'px'}}></div>
          {zippedOrders.map(z => <OrderCountdown dueDate={new Date(z[0].dueAt)} timespan={z[0].deliveryAreaModel.minimumDuration} style={{top: z[1].y + 'px', left: z[1].x + 'px', position: 'absolute'}} />)}
        </div>
      );
    }

    return (
      <div id="map-container">
        <div id="mapbox-container" ref="map"></div>
        {markers}
      </div>
    );
  },

});
