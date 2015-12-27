var mongoose = require('mongoose'),
    Orders = mongoose.model('Orders'),
    Movies = mongoose.model('Movies');

exports.save = function (req,res) {
    var order = new Orders({
        movieId: req.body.movieId,
        customerId : 2
    });

    order.save(function(err, order) {
        if (!err) {
            return res.send("inserted");
        } else {
            console.log(err);
            return res.send(404, { error: "order was not inserted." });
        }
    });
}

exports.test = function (req,res) {
    var test = "date,savings,total,optimal  \r\n" +
    "2001-01-01,     10,   10,     50       \r\n" +
    "2001-02-01,     90,  100,    100 \r\n" +
    "2001-03-01,     30,  130,    150 \r\n" +
    "2001-04-01,     45,  175,    200 \r\n" +
    "2001-05-01,     50,  225,    250 \r\n" +
    "2001-06-01,     75,  300,    300 \r\n" +
    "2001-07-01,     10,  310,    350 \r\n" +
    "2001-08-01,     30,  340,    400 \r\n" +
    "2001-09-01,     65,  405,    450 \r\n" +
    "2001-10-01,    100,  505,    500 \r\n" +
    "2001-11-01,    110,  615,    550 \r\n" +
    "2001-12-01,     80,  695,    600 \r\n" +
    "2002-01-01,     35,  730,    650 \r\n" +
    "2002-02-01,     70,  800,    700 \r\n" +
    "2002-03-01,    150,  950,    750";

    res.send(test);
}

exports.popular = function (req,res) {
    Orders.aggregate(
        {
            $project: {
                _id: 0,
                count: 1,
                movie: '$movieId'
            }
        },
        {
            $group: {
                _id:"$movie",
                count: { $sum: 1 }
            }
        }).exec(function(err,data) {

            var csv = "movie,amount\r\n";

            Movies.populate(data,{ path:'_id', select: "name"}, function(err,movies) {
                movies.forEach(function (movie) {
                    csv = csv + movie._id.name + "," + movie.count + "\r\n";
                })
                res.send(csv);
            });



    });


};

exports.ordersPerDay = function (req,res) {
    return res.send("age,population\r\n " +
    "               א,5 \r\n" +
    "                    ב,8\r\n" +
    "ג,3                \r\n" +
    "ו,9            ");
};