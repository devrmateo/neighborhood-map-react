import React, { Component } from 'react';
import LocationsList from './components/locations';
import Map from './components/mapDisplay';
import './App.css';
import {getGoogleMaps, getPlaces} from './utils';

class App extends Component {

  state = {
    query: '',
    filtered: [],
    lat: 34.15334,
    lng: -118.761676,
  }

  componentDidMount = () => {
    let googleMapsPromise = getGoogleMaps();
    let placesPromise = getPlaces(this.state.lat, this.state.lng);

    Promise.all([
      googleMapsPromise,
      placesPromise
      ])
      .then((values) => {
        let google = values[0];
        let places = values[1].response.groups[0].items;
        let venues = [];
        places.forEach((place) => {
          const venue = place.venue;
          venues.push(venue);
        })
        this.google = google;
        this.markers = [];
        this.infowindow = new google.maps.InfoWindow();
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {
            lat: this.state.lat,
            lng: this.state.lng
          }
        });
        venues.forEach((venue) => {
          const marker = new google.maps.Marker({
            map: this.map,
            position: {lat: venue.location.lat, lng: venue.location.lng},
            title: venue.name,
            animation: window.google.maps.Animation.DROP,
            id: venue.id,
        });
      // Push the marker to our array of markers.
        this.markers.push(marker);
        marker.addListener('click', () => {
          this.populateInfoWindow(this, this.infowindow);
        });
        });
        this.setState({
          filtered: venues,
        })
        console.log(this.state.filtered);
      });
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
      zoom: 13
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
        id: this.state.locations[i].venue.id,
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
      const location = this.state.locations.filter((location) => location.venue.id === marker.id)[0].venue;

      infowindow.setContent(`
                              <h3>${location.name}</h3>
                              <div>${location.location.formattedAddress[0]}</div>
                              <div>${location.location.formattedAddress[1]}</div>
                              <div>${location.location.formattedAddress[2]}</div>
                              <p><em>Locations provided by FourSquare</em></p>
                            `);
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

    this.populateInfoWindow(filtered, this.state.infowindow);
    filtered.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(() => {filtered.setAnimation(-1)}, 725);
    this.closeDrawer();
  }

  toggleDrawer = () => {
        const drawer = document.querySelector('.drawer');
        drawer.classList.toggle('open');
  }

  closeDrawer = () => {
      const drawer = document.querySelector('.drawer');
      if (drawer.classList.contains('open')) {
         drawer.classList.remove('open');
      }
   }

  render() {
    return (
      <div className="App">
        <LocationsList />
        <Map />
      </div>
    );
  }
}

export default App;
