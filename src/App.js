import React from 'react';
import MapContainer from './components/mapContainer';
import LocationList from './components/locations';

class App extends React.Component {

  render() {

    return (
      <div className="App">
        <LocationList />
        <MapContainer />
      </div>
    );
  }
}

export default App;
