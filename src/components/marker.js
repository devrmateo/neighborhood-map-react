import React from 'react';
import './marker.css';

export class Marker extends React.Component {
     componentDidMount() {
          this.renderMarker();
     }

     renderMarker() {
          let map = this.props.map;
          let google = this.props.google;
          let position = this.props.mapCenter;
          console.log(map);
          console.log(google);
          console.log(position);

          let pos = position;
          position = new google.maps.LatLng(pos.lat, pos.lng);

          const pref = {
               map: map,
               position: position
          }

          this.marker = new google.maps.Marker(pref);
     }


     render() {

          return null;
     }
}

export default Marker;