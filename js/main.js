	function initialize() {
		var mapOptions = {
			center:{lat:38.8993487,lng:-77.0145665},
			zoom: 12
		};

		navigator.geolocation.getCurrentPosition(function(position) {
		       var latitude = position.coords.latitude;
		       var longitude = position.coords.longitude;
		       var geolocpoint = new google.maps.LatLng(latitude, longitude);
		         map.setCenter(geolocpoint );//line added for setting center
		         map.setZoom(18);
		       });

		var map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);

		function CreateNewMarker(MarkerObject){

			// console.log(MarkerObject);
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(MarkerObject.geometry.coordinates[1], MarkerObject.geometry.coordinates[0]),
				map: map,
				title: MarkerObject.title
			});
		}

		$.getJSON('js/json/WashingtonDC.json', function(json, textStatus) {
			for (var i = 0; i < json.features.length; i++) {
				CreateNewMarker({
					properties: json.features[i].properties,
					geometry: json.features[i].geometry
				});
				// console.log(json.features[i].properties);
			};
		});
	}

	google.maps.event.addDomListener(window, 'load', initialize);