import React from 'react';
import './locations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'


class LocationsList extends React.Component {

     render() {

          const {locations} = this.props;


          return (
               <div className="locations">
                  <FontAwesomeIcon
                    icon={faBars}
                    className="fa"
                  />
                  <div className="listWrapper">
                    <input
                         type="text"
                         value={this.props.query}
                         placeholder="Filter Locations"
                         onChange={(e) => this.props.filterLocations(e.target.value)}
                    />
                    <p className="fourSquare"><em>Locations provided by FourSqure</em></p>
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
               </div>
          );
     }
}

export default LocationsList;