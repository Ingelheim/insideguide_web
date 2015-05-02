var placerApp = angular.module('placerApp', []);

placerApp.controller('MainCtrl', function ($scope) {
  $scope.test = 'angular works';
});


// PARSE
Parse.initialize("gWdWf52zby4WzzL8JL8GIi0flfwzCPkL1tdqCzHP", "4EgKP2QkclnL8NY8VSRjx5tyErWnmZ8fnBWfywEh");
var Marker = Parse.Object.extend("Marker");

// MAPS

var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
var mapOptions =
{
    zoom: 5,
    center: myLatlng
}

var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

console.log(map)

function addMarker (lat, lang) {
	var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lang),
      map: map,
      title: 'Hello World!'
});
}

function initialize() {
	var query = new Parse.Query(Marker);
	query.find({
  success: function(results) {
    for (var i = 0; i < results.length; i++) {
      var object = results[i];
      addMarker(object.get('latitude'), object.get('longitude'))
      // alert(object.id + ' - ' + object.get('playerName'));
    }
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});
}

function placeMarker(position, map) {
  var marker = new google.maps.Marker({
    position: position,
    map: map
  });

  console.log(position)
  console.log(marker)

  var newMarker = new Marker();

  newMarker.save(
  	{longitude: position.lng(), latitude: position.lat()},
  	{success: function(object){
			console.log("sucessfully saved " + object);
		},
		error: function(model, error){
			console.log("error")
		}
	})
}

google.maps.event.addDomListener(window, 'load', initialize);

google.maps.event.addListener(map, 'click', function(e) {
    placeMarker(e.latLng, map);

    Parse.Push.send({
  channels: [ "" ],
  data: {
    alert: "A marker has been added",
    badge: "Increment",
    sound: "cheering.caf",
    title: "Marker added"
  }
}, {
  success: function() {
    // Push was successful
  },
  error: function(error) {
    // Handle error
  }
});
  });
