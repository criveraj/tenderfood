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

$(document).on("click", "button.like", addToFav);
$(document).on("click", "button.dislike", nextResult);

// Yelp APi & Node.js
// $(document).ready(function() {
	var yelpAPIFunction = function(address) {
		var queryURL = 	"https://pure-savannah-62932.herokuapp.com/yelp/?q=" + choiceSelector + '&location=' + address + "&radius=5mi&open_now=true";

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

function displayResults (indexPosition){
	var distanceMiles = Math.round((aryOfYelpResults[numValue].distance * 0.000621371192)*100)/100;
	currentYelpAddr = aryOfYelpResults[numValue].location;
	currentYelpImage = aryOfYelpResults[numValue].image_url;
	currentYelpName = aryOfYelpResults[numValue].name;
	currentYelpPrice = aryOfYelpResults[numValue].price;
	currentRating = aryOfYelpResults[numValue].rating;
	currentYelpPhone = aryOfYelpResults[numValue].display_phone;
	currentYelpURL = aryOfYelpResults[numValue].url;
	var yelpImg =  "<div class='image-resize-div'><img class='thumbnail image-resize' src='" + currentYelpImage + "' width='800'></div>";
	var yelpData = "<h5><b>" + currentYelpName + "</b></h5><p><b>Price:</b> " + currentYelpPrice + "<br/><b>Rating:</b> " + currentRating + "/5<br/><b>Miles Away:</b> " + distanceMiles + "<br/><b>Phone:</b> " + currentYelpPhone +"</p><a href='" + currentYelpURL + "' class='button small expanded hollow yelp-link'>Take Me There</a>";
	$(".img-responsive").html(yelpImg);
	$(".img-responsive").append(yelpData);
}

function addToFav() {
	console.log(aryOfYelpResults[numValue]);
	currentYelpAddr = aryOfYelpResults[numValue].location;
	currentYelpImage = aryOfYelpResults[numValue].image_url;
	currentYelpName = aryOfYelpResults[numValue].name;
	currentYelpPrice = aryOfYelpResults[numValue].price;
	currentRating = aryOfYelpResults[numValue].rating;
	currentYelpPhone = aryOfYelpResults[numValue].display_phone;
	currentYelpURL = aryOfYelpResults[numValue].url;


	var FaveObject = {img: currentYelpImage,
	name: currentYelpName,
	distance: currentYelpAddr.display_address[0],
	rating: currentRating,
	phone: currentYelpPhone,
	price: currentYelpPrice}
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
