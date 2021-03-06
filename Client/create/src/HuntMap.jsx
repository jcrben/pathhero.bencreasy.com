'use strict';
/* jshint quotmark: false */

var React = require('react');
var gMap = require('../../../lib/gMapLib');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      style: {
        height: window.innerHeight,
        position: 'fixed'
      }
    };
  },
  componentDidMount: function() {
    gMap.startGMap({lng: -122, lat: 38});
    gMap.getGeolocation(gMap.setCenter);
  },
  render: function() {
    return (
      <div id="map-container" className="col-xs-6">
        <div id="gMap" style={this.state.style}>
        </div>
      </div>
    );
  }
});
