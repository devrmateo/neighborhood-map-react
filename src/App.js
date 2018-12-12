import React from 'react';
import LocationsList from './components/locations';
import MapWrapper from './components/mapWrapper';
import './App.css';

class App extends React.Component {

  state = {
    locations: []
  }

  componentDidMount() {
    fetch('https://api.foursquare.com/v2/venues/explore?client_id=JEASTQIYAOQHC5EJ45NM4QUSD2AS11EADPF51VDM42O4Q13A&client_secret=GEMFOAQ5IBMRS1ROLEFMRMNEZSV0R3QYPZEMLALQJNUFANCH&v=20180323&limit=15&ll=40.7243,-74.0018&near=Agoura Hills, CA')
    .then((response) => response.json()
    )
    .then((data) => {
      let fetchedLocations = [];
      for (let i = 0; i < data.response.groups[0].items.length; i++) {
        fetchedLocations.push(data.response.groups[0].items[i].venue)
      }
      return fetchedLocations;
    })
    .then((fetchedLocations) =>
      this.setState({
        locations: fetchedLocations
      })
    )
    .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <LocationsList
          locations={this.state.locations}
        />
        <MapWrapper
          locations={this.state.locations}
        />
      </div>
    );
  }
}

export default App;