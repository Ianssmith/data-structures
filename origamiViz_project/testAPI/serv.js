var models = ['crane', 'X_crane']


//res.json(json), res.json(status, json)
var pg = require('pg');

// connection string

var un = ''; // aws db username
var pw = ''; // aws db password
var db = ''; // aws db database name
var ep = ''; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;



var http = require("http");
var express = require('express');
var app = express();

//var server = http.createServer(function(req, res) {

app.get('/model/:model_name',function(req,res){


var params = req.params.model_name
	
//res.send(req.params)
console.log(params);

//parse req.params
if(models.indexOf(params)>=0){


//construct db query using params
var q = "SELECT x,y,z,pitch,roll,acceleration,inclination,orientation FROM ori WHERE model = '"+params+"';"

//connect and send db query
	var dbq = pg.connect(conString, function(err, client, done) {
		if (err) {
			return console.error('error fetching client from pool', err);
		}

		var resp = client.query(q, function(err, result) {
			//call `done()` to release the client back to the pool
			done();

			if (err) {
				return console.error('error running query', err);
			}
			//console.log(result.rows);
			//send db response to client
			res.json(result.rows);
		});
		return resp;
	});
}else{
	res.end("That model has not been made yet. You could try \""+models[Math.floor(Math.random()*(models.length))]+"\".")
}

});

app.listen(8080);
