import React from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';
import {Marker} from 'google-maps-react/dist/components/Marker';

export class MapWrapper extends React.Component {

     render() {

          const locations = this.props.locations;
          let lat = this.props.lat;
          console.log(lat);
          let lng = this.props.lng;
          console.log(lng);
          let center = {
               lat: lat,
               lng: lng
          };
          console.log(center);

          return (
               <div id="mapWrapper">
                    <Map
                         google={this.props.google}
                         initialCenter={{
                              lat: lat,
                              lng: lng
                         }}
                         role="application"
                         aria-label="map"
                    >

                    {locations.map((location) => {
                         return (
                              <Marker
                                   key={location.id}
                                   position={{
                                        lat: location.location.lat,
                                        lng: location.location.lng
                                   }}
                              />)
                    })}

                    </Map>

               </div>

          )
     }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYxtGxA3B4KgCSBExLmK_lD_lq5u-xkMA'
})(MapWrapper)