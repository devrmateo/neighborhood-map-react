import React from 'react';
import './mapDisplay.css';

const Map = (props) => {

     return (
               <div
                    id="map"
                    role="application"
                    aria-label="map"
                    onClick={props.closeDrawer}
               >
               </div>


     )
}

export default Map;
