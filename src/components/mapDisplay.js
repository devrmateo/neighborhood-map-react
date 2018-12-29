import React, { Component } from 'react';
import './mapDisplay.css';

class Map extends Component {

     render() {
          return(
               <div
                    id="map"
                    role="application"
                    aria-label="map"
                    onClick={this.props.closeDrawer}
               >
               </div>
          )
     }
}

export default Map;
