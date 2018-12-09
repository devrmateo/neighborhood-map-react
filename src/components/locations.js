import React from 'react';
import './locations.css';


class LocationsList extends React.Component {
     render() {
          const locations = this.props.locations;
          console.log(locations);

          return (
               <div className="locationsListWrapper">
                    <h3>Locations</h3>
                    <ul>
                         <li></li>
                    </ul>
               </div>
          )
     }
}

export default LocationsList;
