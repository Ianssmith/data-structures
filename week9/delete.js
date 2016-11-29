var pg = require('pg');

// connection string
var un = ''; // aws db username
var pw = ''; // aws db password
var db = ''; // aws db database name
var ep = ''; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;


var del = "DELETE FROM ori WHERE model = 'crane';"

pg.connect(conString, function(err, client, done) {
		if (err) {
		return console.error('error fetching client from pool', err);
		}

		client.query(del, function(err, result) {
				//call `done()` to release the client back to the pool
				done();

				if (err) {
				return console.error('error running query', err);
				}
				console.log(result.rows);
				});

		});



