'use strict';

/**
 * Module dependencies.
 */
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

/**
 * Getter
 */
var escapeProperty = function(value) {
    return _.escape(value);
};

/**
 * Movie Schema
 */
var OrderSchema = new Schema({
    movieId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Orders', OrderSchema);