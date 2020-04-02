import { GoogleMap } from 'map-loader';


const GOOGLE_MAPS_API_KEY = "AIzaSyBL02cgmPwm-pJ55En3aRvxczdN4hzc05g";

/* Options for how the map should initially render. */
const map_options = {
  center: {
    lat: 47.649196,
    lng: -122.350384
  },
  zoom: 12
}

/* Options for loading the Maps JS API. */
const api_options = {
  version: 'weekly',
  libraries: ['places']
}

/*
 * Set ID of the div where the map will be loaded,
 * and whether to append to that div.
 */
const map_loader_options = {
  apiKey: AIzaSyBL02cgmPwm-pJ55En3aRvxczdN4hzc05g,
  divId: 'put-it-here',
  append: true, // Appends to divId. Set to false to init in divId.
  mapOptions: map_options,
  apiOptions: api_options
};

// Instantiate map loader
const MapLoader = new GoogleMap();

// Load the map
MapLoader
  .initMap(map_loader_options)
  .then((google_map) => {
    // returns instance of google.maps.Map
  });