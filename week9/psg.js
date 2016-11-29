//model list:
//'crane'
//'X_crane'
var pg = require('pg');
var five = require("johnny-five"),
	board = new five.Board();

// connection string
var un = ''; // aws db username
var pw = ''; // aws db password
var db = ''; // aws db database name
var ep = ''; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;

board.on("ready", function() {
	var accelerometer = new five.Accelerometer({
		controller: "ADXL335",
		pins: ["A2", "A1", "A0"],
		//autoCalibrate:true
	});

	var wait = setInterval(getvals,200);

	function getvals(){
		//accelerometer.on("change", function() {
			//var x = this.x;
			var x = accelerometer.x;
			var y = accelerometer.y;
			var z = accelerometer.z;
			var pitch = accelerometer.pitch;
			var roll = accelerometer.roll;
			var accel = accelerometer.acceleration;
			var inclination = accelerometer.inclination;
			var orientation = accelerometer.orientation;

var insertIntoQuery = 
"INSERT INTO ori VALUES ('X_crane', DEFAULT, "+x+", " +y+", " +z+", " +pitch+", " +roll+", " +accel+", " +inclination+", " +orientation+");"

pg.connect(conString, function(err, client, done) {
		if (err) {
		return console.error('error fetching client from pool', err);
		}

		client.query(insertIntoQuery, function(err, result) {
				//call `done()` to release the client back to the pool
				done();

				if (err) {
				return console.error('error running query', err);
				}
				//console.log(result.rows);
				});

		});


		};
});


/*
var query = 
"SELECT avg(amount) as avgAmount, 
	EXTRACT(DOW from dateCreated) as dowAverage 
	FROM accel WHERE dateCreated >= '2016-10-31' 
	GROUP BY dowAverage 
	HAVING avgAmount >1000 
	ORDER BY dowAverage;";
"SELECT * FROM accel;"
var complexQuery = 
"SELECT sum(amount) as total FROM accel GROUP BY whammy;"
*/
