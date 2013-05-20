'use strict';

/* Directives */

Application.Directives.directive('map', ['GoogleMap', 'GoogleLibService', 'GoogleMarkers', 'configuration', function(GoogleMap, google, GoogleMarkers, configuration) {

    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        template: "<div id='map_canvas' style='width:900px; Height:400px'></div>",
        link: function(scope, elm, attrs) {

            scope.$watch('data', function (data) {

                GoogleMap.initMap(46.87916, -3.32910, 'map_canvas');

//                // close infoWindow on zoom_changed event
//                google.maps.event.addListener(GoogleMap.map, 'zoom_changed', function() {
//                    GoogleMap.infoWindow.close(); 
//                });
//
                // add all markers, set bounds to fit all markers on screen
                var bounds = new google.maps.LatLngBounds(),
                    locations = data;

                angular.forEach(locations, function(location) {
                   GoogleMarkers.add(location);
                   bounds.extend(
                       new google.maps.LatLng(
                           location.latitude, 
                           location.longitude
                       )
                   );
                });
                GoogleMap.map.fitBounds(bounds);
            });
        }
    }
 }]);
