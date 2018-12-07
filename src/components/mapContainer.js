import React from 'react';
import Map from './map';
import {GoogleApiWrapper} from 'google-maps-react';
import './mapContainer.css';

export class MapContainer extends React.Component {

     render() {

          return (

               <div id='mapWrapper'>
                    <Map google={this.props.google} />
               </div>
          )
     }

}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYxtGxA3B4KgCSBExLmK_lD_lq5u-xkMA'
})(MapContainer)