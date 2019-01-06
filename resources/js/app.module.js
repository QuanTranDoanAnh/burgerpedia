require('./hamburgers.controller');
require('./hamburger.controller');

// define the 'Burgerpedia' module
// also include ngRoute for all our routing needs
var BurgerPedia = angular.module('BurgerPedia', [
    'ngRoute',
    'Hamburgers',
    'Hamburger'
]);

// define our canstant for the API
BurgerPedia.constant('constants', {
    API_URL: '/api/'
});
// configure our routes
BurgerPedia.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        // route for the hamburgers page
        .when('/', {
            templateUrl: '/app/hamburgers/hamburgers.template.html',
            controller: 'hamburgersController'            
        })

        // route for a single hamburger
        .when('/hamburger/:hamburgerID', {
            templateUrl: '/app/hamburger/hamburger.template.html',
            controller: 'hamburgerController'
        })

        // default route
        .otherwise({
            redirectTo: '/'
        });
}]);

