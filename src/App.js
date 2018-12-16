import React, { Component } from 'react';
import LocationsList from './components/locations';
import './App.css';

class App extends Component {

  state = {
    locations: [],
    lat: 34.15334,
    lng: -118.761676
  }

  componentDidMount = () => {
    fetch('https://api.foursquare.com/v2/venues/explore?client_id=JEASTQIYAOQHC5EJ45NM4QUSD2AS11EADPF51VDM42O4Q13A&client_secret=GEMFOAQ5IBMRS1ROLEFMRMNEZSV0R3QYPZEMLALQJNUFANCH&v=20180323&limit=15&ll=40.7243,-74.0018&near=Agoura Hills, CA')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.response.groups[0].items);
      const locations = data.response.groups[0].items;
      this.setState({
        locations
      });
    })
    .then(() => this.displayMap())
    .catch((error) => console.log(error));
  }

  displayMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?libraries=geometry&key=AIzaSyBYxtGxA3B4KgCSBExLmK_lD_lq5u-xkMA&callback=initMap");
    window.initMap = this.initMap;
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.15334, lng: -118.761676},
    zoom: 12
  });
  }


  render() {
    return (
      <div className="App">
        <LocationsList />
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
