var datetimeStart = new Date();
var resp = [];

var reggie = new RegExp("Tuesday 1?[7890]:[0134][05] pm")


var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://' + process.env.mongoIP + ':27017/meetingBase'

mongoClient.connect(url, function(err, db){
	if(err){return console.dir(err);}

	var collection = db.collection('meetdata')

	collection.aggregate([{$match:{Time:reggie}}]).toArray(function(err, docs){
		if(err){console.log(err)}	
		else{
			resp.push(docs)
			}
			db.close();
			        console.log(new Date() - datetimeStart);

		})

})
