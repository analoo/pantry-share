

    // this actually works.
    // 2020.03.31


    // Initialize and add the map
    function initMap() {
      // The location of Uluru
      var sanFrancisco = { lat: 37.77, lng: -122.42 };
      // The map, centered at Uluru
      var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: sanFrancisco
      });
      // The marker, positioned at Uluru
      var marker = new google.maps.Marker({ position: sanFrancisco, map: map });
    }
// 