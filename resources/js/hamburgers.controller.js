require('angular');

var Hamburgers = angular.module('Hamburgers', []);
// create the controller and inject the Angular $scope
Hamburgers.controller('hamburgersController', ['$scope', '$http', '$location', 'constants', function hamburgersController($scope, $http, $location, constants) {
    // set our current page for pagination purposes
    $scope.currentPage = 1;
    $scope.lastPage = 1;
    $scope.loadMoreText = 'Load More Burgers ...';

    //retrieve hamburgers listing from API
    $http.get(constants.API_URL + "hamburgers", { params: { page: $scope.currentPage }})
        .then(function success(response) {
            console.dir(response);
            $scope.hamburgers = response.data.data;
            $scope.currentPage = response.data.current_page;
            $scope.lastPage = response.data.last_page;

            if ($scope.currentPage >= $scope.lastPage) {
                $scope.loadMoreText = 'All Burgers Loaded';
            }
        });
    
    // infinite scroll of the hamburgers
    $scope.loadMoreBurgers = function() {
        // increase our current page index
        $scope.currentPage++;

        //retrieve hamburgers listing from API and append them to our current list
        $http.get(constants.API_URL + "hamburgers", { params: { page: $scope.currentPage }})
            .then(function success(response) {
                $scope.hamburgers = $scope.hamburgers.concat(response.data.data);
                $scope.currentPage = response.data.current_page;
                $scope.lastPage = response.data.last_page;

                if ($scope.currentPage >= $scope.lastPage) {
                    $scope.loadMoreText = 'All Burgers Loaded';
                }
            });
    };

    // add a new burger
    $scope.addBurger = function() {

        // add the new burger to our listing
        $http.post(constants.API_URL + "hamburgers", $scope.hamburger)
            .then(function success(response) {
                console.log(response);
                 
                // close the modal
                $scope.closeModal();
                 
                // load the page for our newly created burger
                $scope.loadBurgerPage(response.data.id);
            }, function error(response, status, headers, config) {
                // alert and log the response
                alert('Failed to add the burger: [Server response: '+status + '] - ' +response.data.name[0]);
                console.log(response);
            });
    };

    // load the page for an individual burger
    $scope.loadBurgerPage = function(id){
        $location.path("hamburger/"+id);
    }
    
    // display the modal form
    $scope.showModal = function() {
        $('#addBurgerModal').modal('show');
    }
    
    // display the modal form
    $scope.closeModal = function() {
        $('#addBurgerModal').modal('hide');
    }

}]);