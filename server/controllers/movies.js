var mongoose = require('mongoose'),
    Movies = mongoose.model('Movies');

exports.movie = function(req, res, next, id) {
    req.id = id;
    Movies.findById(id, function(err, movie) {
        if (err) return next(err);
        if (!movie) return next(new Error('Failed to load article ' + id));
        req.movie = movie;
        next();
    });
}

exports.save = function(req, res) {

    var id = req.params.movieId

    var movie = new Movies({
        name : req.body.name,
        director : req.body.director,
        releaseDate : req.body.releaseDate,
        genre : req.body.genre,
        picture : req.body.picture,
        price : req.body.price,
        lat: req.body.lat,
        lng: req.body.lng,
        actors: req.body.actors
    });

    var upsertData = movie.toObject();

    console.log(upsertData.lat);

    if (!id) {
        id = upsertData._id
    }

    delete upsertData._id;

    return Movies.update({ _id: id }, {$set: upsertData, $setOnInsert: { _id: id }}, {upsert: true}, function(err) {
        if (!err) {
            return res.send("updated");
        } else {
            console.log(err);
            return res.send(404, { error: "Movie was not updated." });
        }
    });
}

exports.create = function (req, res) {

}

exports.show = function(req, res) {
    res.json(req.movie);
};


