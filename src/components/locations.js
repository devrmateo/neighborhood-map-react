import React from 'react';
import './locations.css';
class LocationsList extends React.Component {

     state = {
          query: ''
     }

     updateQuery = (query) => {
          this.setState({
               query
          });
          this.props.filterLocations(query);
     }

     render() {

          const locations = this.props.locations;

          return (
               <div className="locationsWrapper">
                    <h3 className="locationsHeader">Locations</h3>
                    <input
                         type="text"
                         value={this.state.query}
                         onChange={(e) => this.updateQuery(e.target.value)}
                    />
                    <ul className="locationsList">
                         {locations.map((location) => {
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