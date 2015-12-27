angular.module('AdminCtrl', ['ngAutocomplete','ad3'])

.controller('ChartCtrl', ['$scope' , '$state', function($scope, $state ) {

}])

.controller('AdminCtrl', ['$scope' , '$state', function($scope, $state ) {


}])
.controller('ActorCtrl', ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {

        $scope.name = $stateParams.name;
        $scope.picture = $stateParams.picture;
        console.log($stateParams);


        $scope.done = function () {

        }

}])
.controller('CreateEditMovieCtrl', ['$scope' , '$state', '$stateParams', 'Movie', 'Geocoder', function($scope, $state,$stateParams, Movie, Geocoder ) {

        $scope.autocomplete = '';
        $scope.autocompleteOptions = {
            types: '(cities)'
        };
        $scope.autocompleteDetails = '';

        $scope.findOne = function() {
            if (!$stateParams.movieId) {
                $scope.movie = new Movie();
                $scope.movie.picsrc = "//placehold.it/100";
                return;
            }
            console.log("h")
            Movie.get({
                movieId: $stateParams.movieId
            }, function(movie) {
                $scope.movie = movie;
                setAddressByLatLng(movie.lat, movie.lng);
                if (movie.picture) {
                    $scope.movie.picsrc = movie.picture;
                } else {
                    $scope.movie.picsrc = "//placehold.it/100";
                }
            });
        };

        $scope.addActor = function () {
            $state.go('.^.editActor')
        }

        $scope.save = function() {
            Geocoder.latLngForAddress($scope.autocomplete, function(latlng) {
                console.log(latlng);
                $scope.movie.lat = latlng.lat;
                $scope.movie.lng = latlng.lng;
                $scope.movie.$update(function () {
                    $state.go('.^.list');
                });
            });


        }

        $scope.back = function() {
            $state.go('.^.list');
        }

        function setAddressByLatLng(lat,lng) {
            var geocoder = new google.maps.Geocoder();
            console.log(lat);
            var latlng = new google.maps.LatLng(lat, lng);
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        console.log(results[1].formatted_address);
                        $scope.$apply(function() {
                            $scope.autocomplete = results[1].formatted_address;
                        })

                    } else {
                        console.log('Location not found');
                        return  "";
                    }
                } else {
                    console.log('Geocoder failed due to: ' + status);
                }
            });
        }
}]);
