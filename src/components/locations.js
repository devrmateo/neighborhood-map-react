import React from 'react';
import './locations.css';


class LocationsList extends React.Component {

     render() {
          const locations = this.props.locations;

          return (
               <div className="locationsListWrapper">
                    <h3>Locations</h3>
                    <ul className="locationsList">
                         {locations.map((location) => {
                              return (
                                   <li
                                        className="locationsListItem"
                                        key={location.id}
                                   >
                                        {location.name}
                                   </li>
                              )
                         })}
                    </ul>
               </div>
          )
     }
}

export default LocationsList;
