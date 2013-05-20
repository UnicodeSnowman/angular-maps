'use strict';

/* Filters */
// used for pagination, in combination with the included LimitTo filter
// first parameter takes data values from repeater, second value from filter
// parameters, where in data list to start displaying content: 
//      currentPage * pageSize : example: 0 * 5 = 0, 1 * 5 = 5, etc. then 
//      limited by LimitTo filter 
Application.Services.filter('StartFrom', function () {
   return function(input, start) {
      if (input) {
          return input.slice(+start); 
      }
   } 
});


// display filter
Application.Services.filter('MarkersFilter', ['$rootScope', '$filter', function ($rootScope, $filter) {
    return function(input, searchTerm) {
       var filteredMarkers = [];

       filteredMarkers = searchTerm ? $filter('filter')(input, { 'email' : searchTerm }) : [];

       //$rootScope.$broadcast('filteredMarkersLength', {'markers' : filteredMarkers} );
       return filteredMarkers; 
    }
}]);

