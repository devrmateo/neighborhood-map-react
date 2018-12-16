import React from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import {Marker,} from 'google-maps-react/dist/components/Marker';

export class MapWrapper extends React.Component {
     state = {
          showingInfoWindow: false,
          activeMarker: {},
          selectedPlace: {},
     };

     onMarkerClick = (props, marker, e) =>
          this.setState ({
               activeMarker: marker,
               showingInfoWindow: true
          });

     render() {

          const locations = this.props.locations;
          const lat = this.props.lat;
          const lng = this.props.lng;
          const center = {
               lat: lat,
               lng: lng
          }

          return (

                    <Map
                         role="application"
                         aria-label="map"
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

                    <InfoWindow
                         marker={this.state.activeMarker}
                         visible={this.state.showingInfoWindow}>
                              <div>
                                   <h1>{this.state.selectedPlace.name}</h1>
                              </div>

                    </InfoWindow>

                    </Map>



          )
     }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYxtGxA3B4KgCSBExLmK_lD_lq5u-xkMA'
})(MapWrapper)