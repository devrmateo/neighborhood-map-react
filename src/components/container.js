import React from 'react';
import Map from './map';
import {GoogleApiWrapper} from 'google-maps-react';

export class Container extends React.Component {
     render() {

          return (
               <div id='wrapper'>
                    <Map google={this.props.google} />
               </div>
          )
     }

}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYxtGxA3B4KgCSBExLmK_lD_lq5u-xkMA'
})(Container)