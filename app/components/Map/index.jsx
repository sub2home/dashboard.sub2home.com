var React = require('react');
require('mapbox.js');
require('style!css!mapbox.js/theme/style.css');

require('./index.less');

L.mapbox.accessToken = 'pk.eyJ1Ijoic2NoaWNrbGluZyIsImEiOiJaVmVKYXNZIn0.xyixB3YzrJjM_u4rDIotDg';

function modelToKey(model) {
  return '' + model.addressModel.latitude + model.addressModel.longitude;
}

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

  _updateMap: function() {

    var latlngs = this.props.orders.map(o => [o.addressModel.latitude, o.addressModel.longitude]);
    latlngs.push([this.props.store.addressModel.latitude, this.props.store.addressModel.longitude]);
    var bounds = L.latLngBounds(latlngs);

    this._map.fitBounds(bounds, { padding: [50, 50] });

    //latlngs.forEach(function(latlng) {
      //markers.push(L.marker(latlng).addTo(this._map));
    //}, this);
  },

  render: function() {
    var markers;

    if (this.state.initialized) {
      this._updateMap();
      window.map = this._map;

      var latlng = [this.props.store.addressModel.latitude, this.props.store.addressModel.longitude];
      var p = this._map.latLngToLayerPoint(latlng);
      //console.log(corner, p);
      markers = (
        <div id="mapStoreMarker" style={{top: p.y + 'px', left: p.x + 'px'}}></div>
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

