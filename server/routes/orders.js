module.exports = function(app) {
    var orders = require('../controllers/orders');

    app.put('/movies/:movieId/order', orders.save);

    app.get('/orders/GetPopularMovies', orders.popular);

    app.get('/orders/GetOrdersPerDay', orders.ordersPerDay);

    app.get('/orders/Test', orders.test);
}