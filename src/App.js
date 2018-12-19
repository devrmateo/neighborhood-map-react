import React from 'react';
import LocationsList from './components/locations';
import MapWrapper from './components/mapWrapper';
import './App.css';

class App extends React.Component {

  state = {
    locations: [],
    filteredLocations: null,
    lat: 34.15334,
    lng: -118.761676,
    selectedId: null,
    selectedMarker: null
  }

  componentDidMount = () => {
    fetch(`https://api.foursquare.com/v2/venues/explore?client_id=JEASTQIYAOQHC5EJ45NM4QUSD2AS11EADPF51VDM42O4Q13A&client_secret=GEMFOAQ5IBMRS1ROLEFMRMNEZSV0R3QYPZEMLALQJNUFANCH&v=20180323&limit=15&ll=${this.state.lat},${this.state.lng}`)
    .then((response) => response.json()
    )
    .then((data) => {
      let fetchedLocations = [];
      for (let i = 0; i < data.response.groups[0].items.length; i++) {
        fetchedLocations.push(data.response.groups[0].items[i].venue)
      }
      return fetchedLocations;
    })
    .then((fetchedLocations) => {
      const locations = fetchedLocations;
      this.setState({
        locations,
        filteredLocations: this.filterLocations(locations, "")
      });
    })
    .catch((error) => alert("There was an error loading FourSquare data."));
  }

  updateQuery = (query) => {
    this.setState({
      selectedIndex: null,
      filteredLocations: this.filterLocations(this.state.locations, query)
    });
  }

  filterLocations = (locations, query) => {
    return locations.filter((location) => location.name.toLowerCase().includes(query.toLowerCase()));
  }

  markers = []

  addMarker = (marker) => {
    if (this.markers.indexOf(marker) === -1 && marker !== null) {
      this.markers.push(marker);
    }
  }

  clickMarker = (id) => {
    const marker = this.markers.filter((marker) => marker.marker.id === id)[0];
    console.log(marker);
    this.setState({
      selectedId: id,
      selectedMarker: marker
    });
  }

  clickListLocation = (index) => {
    this.setState({
      selectedIndex: index
    });
  }

  render() {
    return (
      <div className="App">
        <LocationsList
          locations={this.state.filteredLocations}
          filterLocations={this.updateQuery}
          clickMarker={this.clickMarker}
          clickListLocation={this.clickListLocation}
        />
        <MapWrapper
          locations={this.state.filteredLocations}
          lat={this.state.lat}
          lng={this.state.lng}
          addMarker={this.addMarker}
          clickMarker={this.clickMarker}
          selectedMarker={this.state.selectedMarker}
          selectedIndex={this.state.selectedIndex}
        />
      </div>
    );
  }
}

export default App;