angular.module('HomeService', [])


    .factory('Directors', ['$resource',
        function($resource) {
            return $resource('home/GetAllDirectors');

    }]);