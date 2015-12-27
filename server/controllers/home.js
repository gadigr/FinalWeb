'use strict';

var mongoose = require('mongoose'),
    Movies = mongoose.model('Movies');

exports.render = function(req, res) {
    var path = require('path');
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
}


exports.allMovies = function(req, res) {
    Movies.find()
        .populate('Movies').exec(function(err, movies) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot list the movies'
            });
        }
        res.json(movies);

    });
}

/**
 * List of Movies
 */
exports.getMovies = function(req, res) {
    //console.log(req.params.genre.split(','));
    var query = Movies.find();
    req.params.qry != 'null' ? query.where('name').equals(new RegExp(req.params.qry, 'i')) : query;
    req.params.director != 'null' ? query.where('director').equals(req.params.director) : query;
    req.params.genre != 'null' ? query.where('genre').in(req.params.genre.split(',')) : query;
    //query.where('price').gt(req.params.minPrice).lt(req.params.maxPrice);
    //query.where('year').gt(new Date('1/1/'+req.params.minYear)).lt(new Date('31/12/'+req.params.maxYear));
    query.populate('Movies').exec(function(err, movies) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot list the movies'
            });
        }
        res.json(movies);

    });
}

exports.allDirectors = function(req, res) {
    Movies.find().distinct('director' ,function(err, directors) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot list the directors'
            });
        }
        res.json(directors);

    });
};