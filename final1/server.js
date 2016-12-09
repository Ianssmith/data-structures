//var http = require("http");
//var express = require('express');
var app = require('express')();
var server = require('http').createServer(app)
var io = require('socket.io')(server);

server.listen(8080, "127.0.0.1");

app.get('/', function(req,res){
	res.sendFile(__dirname + "/index.html");
});

io.on('connection', function(socket){
	socket.emit('news',connectMongo);

});

function connectMongo(){
var datetimeStart = new Date();
var hour = function(){
	var d = datetimeStart.getHours()
	if(d>=13){
		return d-12 + " pm"
	}else{
		return d + " am"
	}
}()
var day = function(){
	var day = datetimeStart.getDay()
	var days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
	return days[day]
}()

var resp = [];
console.log(hour)
console.log(day)

//var reggie = new RegExp("Tuesday 1?[7890]:[0134][05] pm")
//var reggie = new RegExp(JSON.stringify(day));
var reggie = new RegExp("Tuesday")


var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://' + process.env.mongoIP + ':27017/meetingBase'

mongoClient.connect(url, function(err, db){
	if(err){return console.dir(err);}

	var collection = db.collection('meetdata')

	collection.aggregate([{$match:{Time:reggie}}]).toArray(function(err, docs){
	//collection.aggregate([{$match:{Time:day}}]).toArray(function(err, docs){
		if(err){console.log(err)}	
		else{
			resp.push(docs)
			}
			db.close();
					console.log(docs)
			        console.log(new Date() - datetimeStart);

		})

})
return resp;
}

