	function initialize() {
		var mapOptions = {
			styles: [
			  {
			    "featureType": "landscape",
			    "stylers": [
			      { "color": "#20bc55" }
			    ]
			  },{
			    "featureType": "water",
			    "stylers": [
			      { "color": "#545847" }
			    ]
			  },{
			    "featureType": "road",
			    "elementType": "geometry",
			    "stylers": [
			      { "color": "#f0f0f2" }
			    ]
			  }
			],
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
		function CreateContent(MarkerObject){
			return "<h3>" + MarkerObject.properties.Name + "</h3>" + MarkerObject.properties.Description;
		}
		function CreateNewMarker(MarkerObject){

			// console.log(MarkerObject);
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(MarkerObject.geometry.coordinates[1], MarkerObject.geometry.coordinates[0]),
				map: map,
				title: MarkerObject.title
			});
			var contentString = CreateContent(MarkerObject);

			 var infowindow = new google.maps.InfoWindow({
			  content: contentString
			});

			 google.maps.event.addListener(marker, 'click', function() {
			  infowindow.open(map,marker);
			  // Fix Centering Problem:
			  map.setCenter(marker.getPosition());
			});
		};

		$.getJSON('js/json/WashingtonDC.json', function(json, textStatus) {
			for (var i = 0; i < json.features.length; i++) {
				CreateNewMarker({
					properties: json.features[i].properties,
					geometry: json.features[i].geometry
				});
				// console.log(json.features[i].properties);
			};
		});
		var logo = document.createElement("div");
		logo.innerHTML = '<span class="pop_up_box_text"><img src=img/logo.png" width="200" height="154" border="0" /></span>';
	}

	google.maps.event.addDomListener(window, 'load', initialize);