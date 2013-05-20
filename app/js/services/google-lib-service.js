'use strict';

/* Services */

Application.Services.factory('GoogleLibService', ['$window', function($window) {
	
    return $window.google;
}]);
