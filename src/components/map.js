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
               // ...
          }
     }

     renderChildren() {
          console.log(this.props.children);
          const children = this.props.children;
          if (!children) {
               return;
          }

          return React.Children.map((children, c) => {
               return React.cloneElement(c, {
                    map: this.map,
                    google: this.props.google,
                    mapCenter: {
                         lat: 34.15334,
                         lng: -118.761676
                    },
                    locations: this.props.locations
               })
          })
     }

     render() {


          return (
               <div id='map' ref='map'>
                    {this.renderChildren()}
               </div>
          )
     }
}

export default Map;