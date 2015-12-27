var express = require('express');
var path = require('path');
var consolidate = require('consolidate');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./config/db');
var methodOverride = require('method-override');
var http = require('http');
var io = require('socket.io');
var app = express();
var server = http.createServer(app);
io = io.listen(server);
require('./server/sockets/base')(io);

var homeRoute = require('./server/routes/home');
var moviesRoute = require('./server/routes/movies');
var ordersRoute = require('./server/routes/orders');

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));

// assign the template engine to .html files
app.engine('html', consolidate['swig']);

// set .html as the default extension
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

db.initDatabase();

homeRoute(app);
moviesRoute(app);
ordersRoute(app);

server.listen(3000);

//app.use('/users', users);

// catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
