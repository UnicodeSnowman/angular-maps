'use strict';

var Application = Application || {};
Application.Services = angular.module('maps.services', []);
Application.Controllers = angular.module('maps.controllers', []);
Application.Filters = angular.module('maps.filters', []);
Application.Constants = angular.module('maps.constants', []);
Application.Directives = angular.module('maps.directives', []);

angular.module('maps', ['maps.services', 'maps.filters', 'maps.controllers', 'maps.constants', 'maps.directives'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'partials/map_data.html'});
    }]);

