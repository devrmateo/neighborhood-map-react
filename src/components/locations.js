import React from 'react';
import './locations.css';
class LocationsList extends React.Component {

     render() {

          const {locations} = this.props;

          return (
               <div className="locationsWrapper">
                    <h3 className="locationsHeader">Locations</h3>
                    <p className="fourSquare"><em>Locations provided by FourSqure</em></p>
                    <input
                         type="text"
                         value={this.props.query}
                         placeholder="Filter Locations"
                         onChange={(e) => this.props.filterLocations(e.target.value)}
                    />
                    <nav>
                         <ul className="locationsList">
                              {locations && locations.map((location) =>
                                   {return <li
                                             key={location.venue.id}
                                             className="listItem">
                                                  <button
                                                       onClick={() => this.props.onListItemClick(location.venue.id)}

                                                  >
                                                       {location.venue.name}
                                                  </button>
                                             </li>
                                        })}
                         </ul>
                    </nav>
               </div>
          );
     }
}

export default LocationsList;