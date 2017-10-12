// Variable for Yelp API
var choiceSelector = "restaurants";
var numValue = 0;
var yelpData = [];
var likedSpots = [];
var aryOfYelpResults = null;

var currentYelpAddr = null;
var currentYelpImage = null;
var currentYelpName = null;
var currentYelpPrice = null;
var currentRating = null;
var currentYelpPhone = null;
var currentYelpURL = null;

$(document).on("click", ".glyphicon-heart", addToFav);
$(document).on("click", ".glyphicon-remove", nextResult);
initMap();
$(document).keydown(function(e) {
  if(e.keyCode == 37) { // left
    addToFav();
  }
  else if(e.keyCode == 39) { // right
    nextResult();
  }
});

// Yelp APi & Node.js
// $(document).ready(function() {
var yelpAPIFunction = function(address) {
  var queryURL = "https://pure-savannah-62932.herokuapp.com/yelp/?q=" + choiceSelector + '&location=' + address + "&radius=8mi&open_now=true";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    var yelpResults = response.jsonBody.businesses;
    aryOfYelpResults = yelpResults;
    displayResults(numValue);
  });
}

// });

function nextResult() {
  displayResults(numValue++);
};

function displayResults(indexPosition) {

  var distanceMiles = Math.round((aryOfYelpResults[numValue].distance * 0.000621371192) * 100) / 100;
  currentYelpAddr = aryOfYelpResults[numValue].location;
  currentYelpImage = aryOfYelpResults[numValue].image_url;
  currentYelpName = aryOfYelpResults[numValue].name;
  currentYelpPrice = aryOfYelpResults[numValue].price;
  currentYelpRating = aryOfYelpResults[numValue].rating;
  currentYelpPhone = aryOfYelpResults[numValue].display_phone;
  currentYelpURL = aryOfYelpResults[numValue].url;
  var yelpImg = "<h2><b>" + currentYelpName + "</b><br><br><div><img src='" + currentYelpImage + "' width='80%'></div></h4><p><b>Price:</b> " + currentYelpPrice + "<br/><b>Rating:</b> " + currentYelpRating + "/6<br/><b>Miles Away:</b> " + distanceMiles + "<br/><b>Phone:</b> " + currentYelpPhone + "</p><a href='" + currentYelpURL + "' class='button medium'>More info</a>";
  $(".img-responsive").html(yelpImg);
	lat = aryOfYelpResults[numValue].coordinates.latitude;
	lng = aryOfYelpResults[numValue].coordinates.longitude;
  newMarker(lat, lng);

}

function addToFav() {
  console.log(aryOfYelpResults[numValue]);
  currentYelpAddr = aryOfYelpResults[numValue].location;
  currentYelpImage = aryOfYelpResults[numValue].image_url;
  currentYelpName = aryOfYelpResults[numValue].name;
  currentYelpPrice = aryOfYelpResults[numValue].price;
  currentYelpRating = aryOfYelpResults[numValue].rating;
  currentYelpPhone = aryOfYelpResults[numValue].display_phone;
  currentYelpURL = aryOfYelpResults[numValue].url;


  var FaveObject = {
    img: currentYelpImage,
    name: currentYelpName,
    address: currentYelpAddr.display_address[0],
    // citeStateZip: currentYelpAddr.display_address,
    rating: currentYelpRating,
    phone: currentYelpPhone,
    price: currentYelpPrice,
    url: currentYelpURL
  }
  //make ajax call to post to backend
  $.ajax({
    url: '/api/faves',
    method: "POST",
    data: FaveObject
  }).done(function(response) {
    // console.log(response);
    // var yelpResults = response.jsonBody.id;
    // aryOfYelpResults = yelpResults;
    displayResults(numValue);
  });
  displayResults(numValue++);
}
var markers = [];
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 33.6694649, lng: -117.8231107},
    zoom: 15
  });
  infoWindow = new google.maps.InfoWindow;


  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found.');
      // infoWindow.open(map);

      map.setCenter(pos);

      // Write the formatted address
      var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      writeAddressName(userLatLng);

    }, function() {

      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function writeAddressName(latLng) {
var geocoder = new google.maps.Geocoder();
geocoder.geocode({
  "location": latLng
},
function(results, status) {
  if (status == google.maps.GeocoderStatus.OK){
      var address = results[0].formatted_address;
      console.log(address);
      yelpAPIFunction(address);

  }

  else
  alert("Unable to retrieve your address");
});
}

 // Adds a marker to the map and push to the array.
function newMarker(lat, lng){
    var pos = {lat: lat, lng: lng};

    var marker = new google.maps.Marker({
          position: pos,
          animation: google.maps.Animation.DROP,
          map: map
        });
        deleteMarkers();
    marker.setMap(map);
    map.setCenter(pos);
    markers.push(marker);

}

    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
      setMapOnAll(null);
    }

    // Shows any markers currently in the array.
    function showMarkers() {
      setMapOnAll(map);
    }

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
      clearMarkers();
      markers = [];
    }
