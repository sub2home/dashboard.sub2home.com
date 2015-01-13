var React = require('react');
var _ = require('lodash');
var OrderCountdown = require('../OrderCountdown');
var config = require('../../config/mapbox');
var cluster = require('../../utils/cluster');

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
      var zippedOrders = _.zip(this.props.orders, orderOffsets).map(z => ({ x: z[1].x, y: z[1].y, order: z[0] }));
      var clusteredOrders = cluster(zippedOrders, 25);

      // markers to state
      markers = (
        <div>
          <div id="mapStoreMarker" style={{top: storeOffset.y + 'px', left: storeOffset.x + 'px'}}></div>
          {clusteredOrders.map(function(c) {
            var counter;
            if (c.points.length > 1) {
              counter = (
                <span className="counter">{c.points.length}</span>
              );
            }

            return (
              <div className="mapOrderDestination" style={{top: c.center.y + 'px', left: c.center.x + 'px'}}>
                {counter}
                <OrderCountdown inMap={true} dueDate={new Date(c.points[0].order.dueAt)} timespan={c.points[0].order.deliveryAreaModel.minimumDuration} />
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div id="map-container" style={{height: (innerHeight - 95) / 2 + 'px'}}>
        <div id="mapbox-container" ref="map"></div>
        {markers}
      </div>
    );
  },
});
