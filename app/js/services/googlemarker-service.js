'use strict';


Application.Services.factory('GoogleMarkers', ['GoogleMarker', 'configuration', '$rootScope', function(GoogleMarker, configuration, $rootScope) {

    var markers = [];

    markers.add = function(device_location) {
        var marker = new GoogleMarker(device_location) || {};
        google.maps.event.addListener(marker.GoogleMarker, 'click', function(m) {
            var clickedMarker = this;
        });
        markers.push(marker.GoogleMarker);
    };

    return markers;
}]);

Application.Services.factory('GoogleMarker', ['GoogleMap', 'configuration',  function(GoogleMap, configuration) {
    
    return function(device_location) {
       var marker = new google.maps.Marker({
            map: GoogleMap.map,
            position: new google.maps.LatLng(device_location.latitude, device_location.longitude),
            icon: configuration.MAP_CONTENT.marker_icons.red_marker,
            email: device_location.email,
            date : device_location.dateadded,
            deviceplatformurl : device_location.deviceplatform,
            isdomainmap: device_location.isdomainmap,
            location : "Click to locate device..."
       });

       this.GoogleMarker = marker;

       google.maps.event.addListener(marker, 'click', function(m) {
            GoogleMap.infoWindow.content = "E-mail: " + marker.email;

            GoogleMap.infoWindow.content = "<br />" + 
                "<div style='text-align:left;'>" +
                    "<img src='" + marker.deviceplatformurl + "' height='25px' width='25px' />" +
                "</div>" + "<br />";

            if (marker.isdomainmap === true) {
                GoogleMap.infoWindow.content += "<em>User ID</em><br />" + marker.email + "<br /><br/>";
            }

            GoogleMap.infoWindow.content += "<em>Last Seen</em><br /><em>" + marker.date + "</em><br /><br />";

            if(marker.location !== 'Click to locate device...') {
                GoogleMap.infoWindow.content += "<em>Approximate Location</em><br />" + marker.location + "</a>"; 
            }

            GoogleMap.infoWindow.open(GoogleMap.map, marker);
       });

    };
}]);

