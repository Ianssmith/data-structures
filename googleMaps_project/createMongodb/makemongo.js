//var request = require('request')
var fs = require('fs')
var file = fs.readFileSync('googObj.json', 'utf-8')
file = JSON.parse(file)


var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://' + process.env.mongoIP + ':27017/meetingBase'

mongoClient.connect(url, function(err, db){
	if(err){return console.dir(err);}

	var collection = db.collection('meetdata')

	file.forEach(function(d){collection.insert(d)})
        db.close()


})
