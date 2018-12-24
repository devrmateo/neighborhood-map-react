import React, { Component } from 'react';
import LocationsList from './components/locations';
import Map from './components/mapDisplay';
import './App.css';

class App extends Component {

  state = {
    map: null,
    query: '',
    locations: [],
    filteredLocations: [],
    lat: 34.15334,
    lng: -118.761676,
    markers: [],
  }

  componentDidMount = () => {
    fetch(`https://api.foursquare.com/v2/venues/explore?client_id=JEASTQIYAOQHC5EJ45NM4QUSD2AS11EADPF51VDM42O4Q13A&client_secret=GEMFOAQ5IBMRS1ROLEFMRMNEZSV0R3QYPZEMLALQJNUFANCH&v=20180323&limit=15&ll=${this.state.lat},${this.state.lng}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const locations = data.response.groups[0].items;
      //Set the filtered location list to be equal to the location list to begin with, so that the list will populate before any filtering is done.
      this.setState({
        locations,
        filteredLocations: locations
      });
    })
    .then(() => this.displayMap())
    .catch((error) => console.log(error));
  }

  displayMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?libraries=geometry&key=AIzaSyBYxtGxA3B4KgCSBExLmK_lD_lq5u-xkMA&callback=initMap");
    window.initMap = this.initMap;
  }

  filterLocations = (query) => {
    let locations;
    if (query) {
      locations = this.state.locations.filter((location) => location.venue.name.toLowerCase().includes(query.toLowerCase()));
    } else {
      locations = this.state.locations;
    }

    this.state.markers.forEach((marker) => {
      if (marker.title.toLowerCase().includes(query.toLowerCase())) {
        marker.setMap(this.state.map);
      } else {
        marker.setMap(null);
      }
    });

    this.setState({
      filteredLocations: locations,
      query
    });
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
    center: {
      lat: this.state.lat,
      lng: this.state.lng},
      zoom: 12
    });

    const infowindow = new window.google.maps.InfoWindow();
    this.setState({
      map,
      infowindow
    });

    const markers = this.state.markers;

    for (let i = 0; i < this.state.locations.length; i++) {
      // Get the position from the location array.
      const position = {
        lat: this.state.locations[i].venue.location.lat,
        lng: this.state.locations[i].venue.location.lng
      };
      const title = this.state.locations[i].venue.name;
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
      marker.addListener('click', () => {
        this.populateInfoWindow(marker, this.state.infowindow);
      });
    }

     this.setState({
      markers
    });
  }

  populateInfoWindow = (marker, infowindow) => {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      // Clear the infowindow content to give the streetview time to load.
      infowindow.setContent(`${marker.title}`);
      infowindow.marker = marker;

      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', () => {
        infowindow.marker = null;
        marker.setAnimation(-1);
      });

      this.state.map.addListener('click', () => {
        infowindow.close();
        infowindow.marker = null;
        marker.setAnimation(-1);
      })

      // Open the infowindow on the correct marker.
      infowindow.open(this.state.map, marker);
    }
  }

  onListItemClick = (id) => {
    let markers = this.state.markers;
    let filtered = markers.filter((marker) => marker.id === id)[0];
    console.log(filtered);

    this.populateInfoWindow(filtered, this.state.infowindow);
    filtered.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(() => {filtered.setAnimation(-1)}, 2000);
  }

  render() {
    return (
      <div className="App">
        <LocationsList
          locations={this.state.filteredLocations}
          filterLocations={this.filterLocations}
          onListItemClick={this.onListItemClick}
        />
        <Map />
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
