angular.module('HomeCtrl', [])
    .controller('ChatCtrl',['$scope', 'chatSocket', 'messageFormatter', 'nickName', '$log', function ($scope, chatSocket,
              messageFormatter, nickName, $log) {
        $scope.nickName = nickName;
        $scope.messageLog = 'Ready to chat!';

        $scope.sendMessage = function() {
            var match = $scope.message.match('^\/nick (.*)');

            if (angular.isDefined(match) &&
                angular.isArray(match) && match.length === 2) {
                var oldNick = nickName;
                nickName = match[1];
                $scope.message = '';
                $scope.messageLog = messageFormatter(new Date(),
                    nickName, 'nickname changed - from ' +
                    oldNick + ' to ' + nickName + '!') +
                $scope.messageLog;
                $scope.nickName = nickName;
            }

            $log.debug('sending message', $scope.message);
            chatSocket.emit('message', nickName, $scope.message);
            $log.debug('message sent', $scope.message);
            $scope.message = '';
        };

        $scope.$on('socket:broadcast', function(event, data) {
            $log.debug('got a message', event.name);
            if (!data.payload) {
                $log.error('invalid message', 'event', event,
                    'data', JSON.stringify(data));
                return;
            }
            $scope.$apply(function() {
                $scope.messageLog = messageFormatter(
                    new Date(), data.source,
                    data.payload) + $scope.messageLog;
            });
        });
    }])



    .controller('ListCtrl', ['$scope', 'Movies', 'Directors' , function($scope, Movies, Directors) {

        $scope.findMovies = function() {
                Movies.query(function (movies) {
                        $scope.movies = movies;
                });
        };

            $scope.findDirectors = function() {
                    Directors.query(function (directors) {
                            $scope.directors = directors;
                    });
            };

        $scope.filterMovies = function(filter) {
            var filters = {};

            filters.qry = filter.qry ? filter.qry : "null";
            filters.director = filter.director ? filter.director : "null";
            filters.genre = ["null"];
            console.log(filter.genre);
            if (filter.genre) {
                filters.genre = [];
                    angular.forEach(filter.genre, function (value,key) {
                    if (value) {
                        filters.genre.push(key);
                    }
                });
            }
            filters.genre = filters.genre.length > 0 ? filters.genre : ["null"];
            filters.minPrice = filter.minPrice ? filter.minPrice : "0";
            filters.maxPrice = filter.maxPrice ? filter.maxPrice : "9999";
            filters.minYear = filter.minYear ? filter.minYear : "1900";
            filters.maxYear = filter.maxYear ? filter.maxYear : "2300";

          Movies.query(filters, function (movies) {
              $scope.movies = movies;
              //$scope.$eval();

          })
        };

}]);