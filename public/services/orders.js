angular.module('OrdersService', [])
    .factory('Order', ['$resource',
        function($resource) {
            return $resource('movies/:movieId/order', {
                movieId: '@movieId'
            }, {
                update: {
                    method: 'PUT' // this method issues a PUT request
                }
            })

        }])