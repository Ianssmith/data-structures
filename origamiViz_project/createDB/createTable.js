var pg = require('pg');

// connection string
var un = ''; // aws db username
var pw = ''; // aws db password
var db = ''; // aws db database name
var ep = ''; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;

//create Table
var createTableQuery = 
"CREATE TABLE ori (model varchar(100), time timestamp DEFAULT current_timestamp, x smallint, y smallint, z smallint, pitch smallint, roll smallint, acceleration smallint, inclination smallint, orientation smallint);"

//insert test row
var insertIntoQuery = 
"INSERT INTO ori VALUES ('test', DEFAULT, 1, 1, 1, 1, 1, 1, 1, 1);"

//retrieve test row
var q = "SELECT * FROM ori;"

pg.connect(conString, function(err, client, done) {
		if (err) {
		return console.error('error fetching client from pool', err);
		}

		client.query(q, function(err, result) {
				//call `done()` to release the client back to the pool
				done();

				if (err) {
				return console.error('error running query', err);
				}
				console.log(result.rows);
				});

		});

