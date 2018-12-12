import React from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';
import {Marker} from 'google-maps-react/dist/components/Marker';

export class MapWrapper extends React.Component {

     render() {

          const locations = this.props.locations;
          console.log(locations);

          return (
               <div id="mapWrapper">
                    <Map
                         google={this.props.google}
                         initialCenter={{
                              lat: 34.15334,
                              lng: -118.761676
                         }}
                         role="application"
                         aria-label="map"
                         locations={this.props.locations}
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