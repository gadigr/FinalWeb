'use strict';

/**
 * Module dependencies.
 */
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;


/**
 * Movie Schema
 */
var MovieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    director: {
        type: String
    },
    releaseDate: {
        type: Date
    },
    genre: {
        type: String
    },
    picture: {
        type: String
    },
    trailer: {
        type: String
    },
    price: {
        type: String,
        default: '0'
    },
    lat: {
        type: String,
        default: '0'
    },
    lng: {
        type: String,
        default: '0'
    },
    actors: [new Schema({
        name: String,
        picture: String
    },{_id: false})]
});

module.exports = mongoose.model('Movies', MovieSchema);