module.exports = function(app) {
    var movies = require('../controllers/movies');
    app.get('/movies/:movieId', movies.show);

    app.put('/movies/:movieId', movies.save);

    app.put('/movies', movies.save);

    app.param('movieId', movies.movie);
}
