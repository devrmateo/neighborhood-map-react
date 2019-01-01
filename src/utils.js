export function getGoogleMaps() {
  return new Promise((resolve, reject) => {
    window.resolveGoogleMapsPromise = () => {
      resolve(window.google);
      delete window.resolveGoogleMapsPromise;
    };
    const script = document.createElement('script');
    const API = 'AIzaSyBYxtGxA3B4KgCSBExLmK_lD_lq5u-xkMA';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  });
}

export function getPlaces(lat, lng) {
     return fetch(`https://api.foursquare.com/v2/venues/explore?client_id=JEASTQIYAOQHC5EJ45NM4QUSD2AS11EADPF51VDM42O4Q13A&client_secret=GEMFOAQ5IBMRS1ROLEFMRMNEZSV0R3QYPZEMLALQJNUFANCH&v=20180323&limit=15&ll=${lat},${lng}`)
    .then((response) => {
      return response.json();
    })
}

export function toggleDrawer() {
        const drawer = document.querySelector('.drawer');
        drawer.classList.toggle('open');
  }

export function closeDrawer() {
      const drawer = document.querySelector('.drawer');
      if (drawer.classList.contains('open')) {
         drawer.classList.remove('open');
      }
   }
