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
                         center={{lat: 34.15334, lng: -118.761676}}
                         google={this.props.google}
                         locations={this.props.locations}
                    >

                    {locations.map((location) => {
                         return (
                              <Marker
                                   key={location.id}
                                   position={{lat: location.lat, lng: location.lng}}
                              />
                         )
                    })}

                    </Map>

               </div>

          )
     }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYxtGxA3B4KgCSBExLmK_lD_lq5u-xkMA'
})(MapWrapper)