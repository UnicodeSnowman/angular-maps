'use strict';

/* Controllers */

Application.Controllers.controller('MapsController', ['$scope', 'GoogleMarkers', 'GoogleMap', '$filter', '$http', function($scope, googlemarkers, googlemap, $filter, $http) {
    var getPageCount;

    $scope.filtered_markers = [];
    $scope.page_size = 10;
    $scope.current_page = 0;
    $scope.page_count = 0;
    $scope.has_devices = googlemarkers.length > 0 ? true : false;

    $http({ method : 'GET', url : 'locations.json' }).
        success(function (data, status, headers) {
            $scope.data = data;
        }).error(function (data, status, headers) {
            console.log('failed to fetch JSON data');
        });

    $scope.search = function() {
        var m = $filter('MarkersFilter')(googlemarkers, searchTerm.value);

        $scope.has_devices = m.length > 0 ? true : false;
        $scope.filtered_markers = m;
        $scope.page_count = getPageCount();
    };

    $scope.previousPage = function() {
        $scope.current_page = ($scope.current_page - 1);
    };
    
    $scope.nextPage = function() {
        $scope.current_page = ($scope.current_page + 1);
    };

    $scope.locateMarker = function(location_data) {
        googlemap.geocoder.geocode({ 'latLng': location_data.marker.position }, function (results, status) {
           if (status == google.maps.GeocoderStatus.OK) {
               $scope.$apply(function () {
                   location_data.marker.location = results[0].formatted_address;
               });
           } 
        });

        // click the marker to trigger icon change and infoWindow open
        new google.maps.event.trigger(location_data.marker, 'click');
        googlemap.map.panTo(location_data.marker.position);
        googlemap.map.setZoom(15);

        // pan/zoom causes zoom changed event, thus closing the infoWindow before the user sees it open, need to wait for idle map...
        var mapIdleListener = google.maps.event.addListener(googlemap.map, 'idle', function() {
              new google.maps.event.trigger(location_data.marker, 'click');
              google.maps.event.removeListener(mapIdleListener);
        });
    };

    getPageCount = function(page_size) {
        if ($scope.filtered_markers.length > 0) {
           return Math.ceil($scope.filtered_markers.length / $scope.page_size); 
        } else {
            return 0;
        }
    };

}]);

