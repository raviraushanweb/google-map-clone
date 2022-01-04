mapboxgl.accessToken =
  "pk.eyJ1IjoidGVzdDAwOTIiLCJhIjoiY2t4c3Z3cWM2MmRuODJva29oYTJsZHFsMCJ9.yWlUhAwJZzpiSRov95U5lA";

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

function successLocation(position) {
  console.log(position);
  showMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  showMap([77.21, 28.64]);
}

function showMap(centerPosition) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: centerPosition,
    zoom: 14,
  });

  const navigationControl = new mapboxgl.NavigationControl();
  map.addControl(navigationControl, "bottom-right");

  const marker = new mapboxgl.Marker().setLngLat(centerPosition);
  marker.addTo(map);

  // Add the control to the map.
  map.addControl(
    new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    }),
    "top-right"
  );

  //directions
  map.addControl(
    new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    }),
    "top-left"
  );
}
