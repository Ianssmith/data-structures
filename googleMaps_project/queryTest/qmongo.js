var datetimeStart = new Date();
//var resp = [];



var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://' + process.env.mongoIP + ':27017/meetingBase'

mongoClient.connect(url, function(err, db){
	if(err){return console.dir(err);}

	var collection = db.collection('meetdata')

	collection.aggregate([
//{"$project":{"Time":1, "Location":1, "Group":1, "Region":1, "day":1, "begin":1, "latLong":1}},
	{$match:
		{ $or: [
			{ $and:[
				{day:2},{begin:{$gte: 19}}
			]},
			{ $and:[
				{day:3},{begin:{$lte:4}}
			]}	
		]}	
	}
		]).toArray(function(err, docs){
		if(err){console.log(err)}	
		else{
			//console.log(JSON.stringify(docs))
			//resp.push(docs)
			}
			db.close();
					//console.log(resp)
			        console.log(new Date() - datetimeStart);

		})

})
