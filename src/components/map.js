import React from 'react';
import ReactDOM from 'react-dom';

class Map extends React.Component {
     componentDidUpdate(prevProps, prevState) {
          if (prevProps.google !== this.props.google) {
               this.loadMap();
          }
     }

     componentDidMount() {
          this.loadMap();
     }

     loadMap() {
          if (this.props && this.props.google) {
               //google is available
               const google = this.props.google;
               const maps = google.maps;

               const mapRef = this.refs.map;
               const node = ReactDOM.findDOMNode(mapRef);

               let zoom = 12;
               let lat = 34.15334;
               let lng = -118.761676;
               const center = new maps.LatLng(lat, lng);
               const mapConfig = Object.assign({}, {
                    center: center,
                    zoom: zoom
               })
               this.map = new maps.Map(node, mapConfig);
          }
          // ...
     }

     render() {

          return (
               <div id='map' ref='map'></div>
          )
     }
}

export default Map;