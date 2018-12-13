import React from 'react';
import './locations.css';


class LocationsList extends React.Component {

     state = {
          query: ''
     }

     updateQuery = (query) => {
          this.setState({
               query: query
          });
          this.props.filterLocations(query);
     }

     render() {
          const locations = this.props.locations;

          return (
               <div className="locationsListWrapper">
                    <h3>Locations</h3>
                    <input
                         type="text"
                         placeholder="Filter List"
                         onChange={(e) => this.updateQuery(e.target.value)}
                         value={this.state.query}
                    />
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
