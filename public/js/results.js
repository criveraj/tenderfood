// Variable for Yelp API
var choiceSelector = "restaurants";
var numValue = 0;
var yelpData = [];
var likedSpots = [];
// var location = "500 E Peltason Dr, Irvine, CA 92617";

$(document).on("click", "button.like", Like);
$(document).on("click", "button.dislike", Dislike);

// Yelp APi & Node.js
$(document).ready(function() {
	var queryURL = 	"https://pure-savannah-62932.herokuapp.com/yelp/?q=" + choiceSelector + "&location=" + "500 E Peltason Dr, Irvine, CA 92617" + "&radius=5mi&open_now=true";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		var yelpResults = response.jsonBody.businesses;
		console.log(yelpResults[numValue]);

			var distanceMiles = Math.round((yelpResults[numValue].distance * 0.000621371192)*100)/100;
			console.log(yelpResults[numValue].location);
			// var yelpDiv = $("<div class='items'>");
			var yelpImg =  "<img src='" + yelpResults[numValue].image_url + "'>";
			var yelpData = "<h5><b>" + yelpResults[numValue].name + "</b></h5><p><b>Price:</b> " + yelpResults[numValue].price + "<br/><b>Rating:</b> " + yelpResults[numValue].rating + "/5<br/><b>Miles Away:</b> " + distanceMiles + "<br/><b>Phone:</b> " + yelpResults[numValue].display_phone +"</p><a href='" + yelpResults[numValue].url + "' class='button small expanded hollow yelp-link'>Take Me There</a>";
			// + yelpResults[i].display_phone + "</td><td>" + yelpResults[i].location.display_address + "</td><td>" + distanceMiles +"</td>";
			// yelpDiv.append(yelpData);
			$(".img-responsive").html(yelpImg);
			$(".results").html(yelpData);

	});
});

function Dislike() {
	numValue++;
	var queryURL = 	"https://pure-savannah-62932.herokuapp.com/yelp/?q=" + choiceSelector + "&location=" + "500 E Peltason Dr, Irvine, CA 92617" + "&radius=5mi&open_now=true";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		var yelpResults = response.jsonBody.businesses;
		console.log(yelpResults[numValue]);

			var distanceMiles = Math.round((yelpResults[numValue].distance * 0.000621371192)*100)/100;
			console.log(yelpResults[numValue].location);
			// var yelpDiv = $("<div class='items'>");
			var yelpImg =  "<div class='image-resize-div'><img class='thumbnail image-resize' src='" + yelpResults[numValue].image_url + "' width='300'></div>";
			var yelpData = "<h5><b>" + yelpResults[numValue].name + "</b></h5><p><b>Price:</b> " + yelpResults[numValue].price + "<br/><b>Rating:</b> " + yelpResults[numValue].rating + "/5<br/><b>Miles Away:</b> " + distanceMiles + "<br/><b>Phone:</b> " + yelpResults[numValue].display_phone +"</p><a href='" + yelpResults[numValue].url + "' class='button small expanded hollow yelp-link'>Take Me There</a>";
			// + yelpResults[i].display_phone + "</td><td>" + yelpResults[i].location.display_address + "</td><td>" + distanceMiles +"</td>";
			// yelpDiv.append(yelpData);
			$(".img-responsive").html(yelpImg);
			$(".results").html(yelpData);
		});
};

function Like() {
	likedSpots.push(yelpData);
	console.log(likedSpots);
	Dislike();
}


//
// // Google Map
// function initMap() {
// 	var origin = {lat: latitude, lng: longitude};
// 	var infowindow = new google.maps.InfoWindow();
// 	var map = new google.maps.Map(document.getElementById('map-div'), {
// 		zoom: 15,
// 		center: origin
// 	});
// 		var service = new google.maps.places.PlacesService(map);
// 		var marker = new google.maps.Marker({
// 		position: origin,
// 		map: map,
// 		title: address
// 	});
// 	marker.addListener('click', function() {
// 		map.setZoom(17);
// 		map.setCenter(marker.getPosition());
// 		infowindow.setContent('<div><strong>Venue: ' + venue  + '</strong></br>' + address + '</strong></br>')
//     		infowindow.open(map, this);
// 	});
// 	service.getDetails({
// 		placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
// 	}, function(place, status) {
// 		if (status === google.maps.places.PlacesServiceStatus.OK) {
// 			var marker = new google.maps.Marker({
// 				map: map,
// 				position: place.geometry.location
// 			});
// 			google.maps.event.addListener(marker, 'click', function() {
// 				infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + 'Place ID: ' + place.place_id + '<br>' + place.formatted_address + '</div>');
// 				infowindow.open(map, this);
// 			});
// 		}
// 	});
// };
