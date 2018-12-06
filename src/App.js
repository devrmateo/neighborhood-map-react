import React from 'react';
import MapContainer from './components/mapContainer';
import LocationsList from './components/locations';

class App extends React.Component {

  render() {

    return (
      <div className="App">
        <LocationsList />
        <MapContainer />
      </div>
    );
  }
}

export default App;
