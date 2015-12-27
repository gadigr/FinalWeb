angular.module('MovieCtrl', ['uiGmapgoogle-maps'
]).controller('MovieCtrl', ['$scope', '$state' ,'$stateParams', 'Movie', 'Order', function($scope, $state, $stateParams , Movie, Order) {

    $scope.order = function() {
        $scope.order = new Order({});

        $scope.order.movieId = $stateParams.movieId;

        $scope.order.$update(function (){
            $state.go('.^.^.home');
        })
    }

    $scope.findOne = function() {
        console.log("h")
        Movie.get({
            movieId: $stateParams.movieId
        }, function(movie) {
            $scope.movie = movie;
            if (!movie.picture) {
                $scope.movie.picture = "//placehold.it/300"

            }

            $scope.map = { center: { latitude: movie.lat, longitude: movie.lng }, zoom: 8 };

            $scope.marker = {
                id: 0,
                coords: {
                    latitude: movie.lat,
                    longitude: movie.lng
                }
            }
        });
    };


}]);