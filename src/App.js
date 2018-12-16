import React, { Component } from 'react';
import LocationsList from './components/locations';
import './App.css';

class App extends Component {

  state = {
    locations: [],
    filteredLocations: [],
    lat: 34.15334,
    lng: -118.761676,
    markers: []
  }

  componentDidMount = () => {
    fetch(`https://api.foursquare.com/v2/venues/explore?client_id=JEASTQIYAOQHC5EJ45NM4QUSD2AS11EADPF51VDM42O4Q13A&client_secret=GEMFOAQ5IBMRS1ROLEFMRMNEZSV0R3QYPZEMLALQJNUFANCH&v=20180323&limit=15&ll=${this.state.lat},${this.state.lng}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.response.groups[0].items);
      const locations = data.response.groups[0].items;
      this.setState({
        locations,
        filteredLocations: this.filterLocations(locations, '')
      });
    })
    .then(() => this.displayMap())
    .catch((error) => console.log(error));
  }

  displayMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?libraries=geometry&key=AIzaSyBYxtGxA3B4KgCSBExLmK_lD_lq5u-xkMA&callback=initMap");
    window.initMap = this.initMap;
  }

  updateLocations = (query) => {
    this.setState({
      filteredLocations: this.filterLocations(this.state.locations, query),
    });
  }

  filterLocations = (locations, query) => {
    return locations.filter((location) => location.venue.name.toLowerCase().includes(query.toLowerCase()));
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
    center: {
      lat: this.state.lat,
      lng: this.state.lng},
      zoom: 12
    });

    const largeInfowindow = new window.google.maps.InfoWindow();

    const markers = this.state.markers;

    for (let i = 0; i < this.state.locations.length; i++) {
      // Get the position from the location array.
      const position = {
        lat: this.state.locations[i].venue.location.lat,
        lng: this.state.locations[i].venue.location.lng
      };
      const title = this.state.locations[i].name;
      // Create a marker per location, and put into markers array.
      const marker = new window.google.maps.Marker({
        map,
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: this.state.locations[i].venue.id
      });
      // Push the marker to our array of markers.
      markers.push(marker);
    }
  }

  render() {
    return (
      <div className="App">
        <LocationsList
          locations={this.state.filteredLocations}
          filterLocations={this.updateLocations}
        />
        <div id="map"></div>
      </div>
    );
  }
}

function loadScript(url) {
  const firstScriptTag = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
}

export default App;
