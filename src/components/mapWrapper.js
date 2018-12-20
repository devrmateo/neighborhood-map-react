import React from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import {Marker} from 'google-maps-react/dist/components/Marker';
import './mapWrapper.css';

export class MapWrapper extends React.Component {
     state = {
          map: null,
          markers: [],
          markerProps: [],
          selectedMarker: null,
          activeMarkerProps: null,
          showingInfoWindow: false
     }

     componentWillReceiveProps = (props) => {
          if (props.selectedIndex) {
                this.updateMarkers(this.props.locations);
          }

          console.log(props);

          this.setState({
               selectedMarker: props.selectedMarker
          });

          console.log(this.state.markerProps);
          console.log(this.state.markers);

          this.onMarkerClick(this.state.markerProps[props.selectedIndex], this.state.markers[props.selectedIndex]);
     }

     saveMarker = (marker) => {
          this.props.addMarker(marker);
     }

     mapReady = (props, map) => {
          this.setState({
               map
          });
     }

     closeInfoWindow = () => {
          this.state.activeMarker && this.state.activeMarker.setAnimation(null);
          this.setState({
               showingInfoWindow: false,
               activeMarker: null,
               activeMarkerProps: null
          })
     }

     onMarkerClick = (props, marker, e) => {
          this.closeInfoWindow();

          this.setState({
               showingInfoWindow: true,
               activeMarker: marker,
               activeMarkerProps: props
          });
     }

     updateMarkers = (locations) => {
          if (!locations) {
               return;
          }
          this.state.markers.forEach((marker) => {
               marker.setMap(null);
          })

          let markerProps = [];
          let markers = locations.map((location, index) => {
               let position = {
                    lat: location.location.lat,
                    lng: location.location.lng
               }

               let mProps = {
                    key: index,
                    index,
                    name: location.name,
                    title: location.name,
                    position: position,
               }

               markerProps.push(mProps);

               let animation = this.props.google.maps.Animation.DROP;
               let marker = new this.props.google.maps.Marker({
                    map: this.state.map,
                    position: location.position,
                    animation
               });

               marker.addListener('click', () => {
                    this.onMarkerClick(mProps, marker, null);
               });

               return marker;
          });

          this.setState({
               markers,
               markerProps
          });
     }

     addMarker = (marker) => {
          this.props.addMarker(marker);
     }

     render() {

          const locations = this.props.locations;
          const lat = this.props.lat;
          const lng = this.props.lng;
          const center = {
               lat: lat,
               lng: lng
          }

          let amProps = this.state.activeMarkerProps;



          return (
               <div
                    id="map"
                    role="application"
                    aria-label="map"
               >
                    <Map
                         google={this.props.google}
                         onReady={this.mapReady}
                         initialCenter={center}
                         zoom={13}
                         onClick={this.closeInfoWindow}
                    >

                    {locations && locations.map((location, index) => {
                         return (
                              <Marker
                                   id={location.id}
                                   key={location.id}
                                   index={index}
                                   position={{
                                        lat: location.location.lat,
                                        lng: location.location.lng
                                   }}
                                   title={location.name}
                                   name={location.name}
                                   onClick={this.onMarkerClick}
                                   ref={this.addMarker}
                              />)
                    })}

                         <InfoWindow
                              marker={this.state.activeMarker}
                              visible={this.state.showingInfoWindow}
                              onClose={this.closeInfoWindow}>
                              <div>
                                  <h3>{amProps && amProps.name}</h3>
                              </div>
                         </InfoWindow>
                    </Map>
               </div>

          )
     }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYxtGxA3B4KgCSBExLmK_lD_lq5u-xkMA'
})(MapWrapper)