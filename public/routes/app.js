angular.module('uiRouterApp', [])


    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider,   $urlRouterProvider) {
            $urlRouterProvider
                .otherwise('/');


            $stateProvider

                // home page
                .state('home', {
                    url: '/',
                    templateUrl: 'views/home/index.html',
                    controller: 'ListCtrl'
                })

                .state('chat', {
                    url: '/chat',
                    templateUrl: 'views/chat/chat.html',
                    controller: 'ChatCtrl'

                })

                .state('movies', {
                    abstract: true,
                    url: '',
                    templateUrl:'views/movies/index.html',
                    controller: 'MovieCtrl'
                })

                .state('movies.detail', {
                    url: '/movies/:movieId',
                    templateUrl: 'views/movies/index.html',
                    controller: 'MovieCtrl'
                })

                .state('admin', {
                    abstract: true,
                    url: '/admin',
                    templateUrl:'views/admin/index.html',
                    controller: 'AdminCtrl'
                })

                .state('admin.dashboard', {
                    url: '',
                    templateUrl: '/views/admin/dashboard.html'
                })

                .state('admin.chart', {
                    url: '/chart',
                    templateUrl: '/views/admin/chart.html'
                })

                .state('admin.movies', {
                    abstract: true,
                    url: '/movies',
                    templateUrl: 'views/admin/movies.html'
                })

                .state('admin.movies.list', {
                    url: '',
                    templateUrl: '/views/admin/listOfMovies.html',
                    controller: 'ListCtrl'
                })

                .state('admin.movies.create', {

                    url: '/create',
                    templateUrl: '/views/admin/createEditMovie.html',
                    controller: 'CreateEditMovieCtrl'

                })

                .state('admin.movies.edit', {

                    url: '/edit/:movieId',
                    templateUrl: '/views/admin/createEditMovie.html',
                    controller: 'CreateEditMovieCtrl'

                })

                .state('admin.movies.create.editActor', {
                    views: {
                        'actor' : {
                            url: '',
                            templateUrl: 'views/admin/editActor.html',
                            controller: 'ActorCtrl'
                        }
                    }
                })

                .state('admin.movies.edit.editActor', {
                    views: {
                        'actor' : {
                            templateUrl: 'views/admin/editActor.html',
                            controller: 'ActorCtrl'
                        }
                    }
                })

}]);