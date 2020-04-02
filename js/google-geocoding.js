function initMap() {
  console.log("you made it");
// set initial orientation and magnification of map
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
  });

  // put the geocoder function into memory
  var geocoder = new google.maps.Geocoder();

  geocodeAddress(geocoder, map);

  // get addresses from foodpantries object and add them to the map
  function geocodeAddress(geocoder, resultsMap) {
    for (let i = 1; i < foodpantries.length; i++) {
      address = foodpantries[i].address
      geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
          resultsMap.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }
}