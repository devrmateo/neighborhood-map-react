import React from 'react';
import './locations.css';
class LocationsList extends React.Component {

     render() {

          const locations = this.props.locations;
          console.log(locations);

          return (
               <div className="locationsWrapper">
                    <h3 className="locationsHeader">Locations</h3>
                    <input
                         type="text"
                         value={this.props.query}
                         onChange={(e) => this.props.filterLocations(e.target.value)}
                    />
                    <ul className="locationsList">
                         {locations && locations.map((location) => {
                              return <li
                                        key={location.venue.id}
                                        className="listItem">
                              {location.venue.name}
                              </li>
                         })}
                    </ul>
               </div>
               );
     }
}

export default LocationsList;