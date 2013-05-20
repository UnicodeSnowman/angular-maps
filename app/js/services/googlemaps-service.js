'use strict';

/* Services */

Application.Services.factory('GoogleMap', ['GoogleLibService', function(google) {
	
    var map = {};

    map.geocoder = new google.maps.Geocoder();
    map.infoWindow = new google.maps.InfoWindow({
        content: 'InfoWindow',
        size: new google.maps.Size(50, 50)     
    });
    map.initMap = function(latitude, longitude, map_element) {
        var map_options = {
            zoom: 12,
            center: new google.maps.LatLng(latitude, longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById(map_element), map_options);
    };

    return map;

}]);
