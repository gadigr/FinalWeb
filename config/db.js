module.exports = {
    url: 'mongodb://127.0.0.1:27017/blockbuster',

    initDatabase : function () {
        var allMovies = require('./../movies');
        var db = require('mongoose').connect(this.url);
        console.log('Initialize the database');
        var test2 = require('./../server/models/orders');
        OrderModel = db.model('Orders');
        var test = require('./../server/models/movies');
        MovieModel = db.model('Movies');

        OrderModel.remove({}, function(err) {

            MovieModel.remove({},function (err) {
                if (!err) {
                    for (var i = 0; i < allMovies.length; i++) {
                        console.log(allMovies[i])
                        MovieModel.create(allMovies[i], function (err, movie) {
                            OrderModel.create({movieId: movie._id, customerId: 1}, function(err) {
                            })
                        });
                    }
                }
            });
        });



    }
}