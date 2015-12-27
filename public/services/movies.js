angular.module('MoviesService', [])
    .factory('Movie', ['$resource',
        function($resource) {
            return $resource('movies/:movieId', {
                movieId: '@_id'
            }, {
                update: {
                    method: 'PUT' // this method issues a PUT request
                }
            })

    }])
    .factory('Movies', ['$resource',
        function($resource) {
            return $resource('home/GetMovies/:qry/:director/:genre/:minPrice/:maxPrice/:minYear/:maxYear',{
                qry : '@qry',
                director: '@director',
                genre : '@genre',
                minPrice: '@minPrice',
                maxPrice: '@maxPrice',
                minYear: '@minYear',
                maxYear: '@maxYear'
            });

    }])
