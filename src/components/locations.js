import React from 'react';
import './locations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'


const LocationsList = (props) => {

     const {filtered} = props;

     return (
          <div className="locations">
               <FontAwesomeIcon
                    icon={faBars}
                    className="fa"
                    onClick={props.toggleDrawer}
               />
               <div className="drawer">
                    <input
                         type="text"
                         value={props.query}
                         placeholder="Filter Locations"
                         onChange={(e) => props.filterLocations(e.target.value)}
                    />
                    <p className="fourSquare"><em>Locations provided by FourSquare</em></p>
                    <nav>
                         <ul className="locationsList">
                              {filtered && filtered.map((location) =>
                                   {return   <li
                                                  key={location.id}
                                                  className="listItem">
                                                  <button
                                                       onClick={() => props.onListItemClick(location.id)}
                                                  >
                                                       {location.name}
                                                  </button>
                                             </li>
                                   })}
                         </ul>
                    </nav>
               </div>
          </div>
     );
}

export default LocationsList;