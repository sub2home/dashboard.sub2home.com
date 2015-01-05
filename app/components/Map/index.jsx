var React = require('react');
var _ = require('lodash');
var OrderCountdown = require('../OrderCountdown');
require('mapbox.js');

require('style!css!mapbox.js/theme/style.css');
require('./index.less');

L.mapbox.accessToken = 'pk.eyJ1Ijoic2NoaWNrbGluZyIsImEiOiJaVmVKYXNZIn0.xyixB3YzrJjM_u4rDIotDg';

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

  componentWillReceiveProps: function(props) {
    this._checkInitialized();
  },

  componentDidMount: function () {
    this._checkInitialized();
  },

  _checkInitialized: function() {
    if (!this.state.initialized && this.props.orders && this.props.store) {
      var options = {
        zoomControl: false,
        attributionControl: false,
      };

      this._map = L.mapbox.map(this.refs.map.getDOMNode(), 'schickling.km6mi09d', options);
      this._map.dragging.disable();
      this._map.touchZoom.disable();
      this._map.doubleClickZoom.disable();
      this._map.scrollWheelZoom.disable();

      this.setState({ initialized: true });
    }
  },

  _alignMap: function() {
    var latlngs = this.props.orders.map(o => [o.addressModel.latitude, o.addressModel.longitude]);
    latlngs.push([this.props.store.addressModel.latitude, this.props.store.addressModel.longitude]);
    var bounds = L.latLngBounds(latlngs);
    this._map.fitBounds(bounds, { padding: [50, 50] });
  },

  render: function() {
    var markers;

    if (this.state.initialized) {
      this._alignMap();

      var storeLatlng = [this.props.store.addressModel.latitude, this.props.store.addressModel.longitude];
      var storeOffset = this._map.latLngToLayerPoint(storeLatlng);

      var orderOffsets = this.props.orders.map(function(order) {
        var latlng = [order.addressModel.latitude, order.addressModel.longitude];
        return this._map.latLngToLayerPoint(latlng);
      }, this);
      var zippedOrders = _.zip(this.props.orders, orderOffsets);

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

