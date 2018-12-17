import React from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';
import {Marker,} from 'google-maps-react/dist/components/Marker';

export class MapWrapper extends React.Component {
     state = {
          map: null,
          markers: [],
          markerProps: [],
          activeMarker: null,
          activeMarkerProps: null,
          showingInfoWindow: false
     }

     mapReady = (props, map) => {
          this.setState({
               map
          });
          this.updateMarkers(this.props.locations);
     }

     updateMarkers = (locations) => {

     }

     render() {

          const locations = this.props.filteredLocations;
          const lat = this.props.lat;
          const lng = this.props.lng;
          const center = {
               lat: lat,
               lng: lng
          }
          const style = {
               height: '100vh',
               width: '100vw'
          }

          return (

                    <Map
                         role="application"
                         aria-label="map"
                         style={style}
                         onReady={this.mapReady}
                         google={this.props.google}
                         initialCenter={center}
                         zoom={13}
                    >

                    {locations.map((location) => {
                         return (
                              <Marker
                                   key={location.id}
                                   position={{
                                        lat: location.location.lat,
                                        lng: location.location.lng
                                   }}
                                   title={location.name}
                                   name={location.name}
                                   onClick={this.onMarkerClick}
                              />)
                    })}

                    </Map>



          )
     }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYxtGxA3B4KgCSBExLmK_lD_lq5u-xkMA'
})(MapWrapper)