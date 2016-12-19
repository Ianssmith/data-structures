var datetimeStart = new Date();
var resp = [];



var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://' + process.env.mongoIP + ':27017/meetingBase'

mongoClient.connect(url, function(err, db){
	if(err){return console.dir(err);}

	var collection = db.collection('meetdata')

	collection.aggregate([
//{"$project":{"Time":1, "Location":1, "Group":1, "Region":1, "day":1, "begin":1, "latLong":1}},
	{$match:{$and:[
		{day:2},{begin:{$gte:19}}
	]}
}
/*
		{ $or: [
			{ $and:[
				{"day":"2"},{"begin":{$gte: 19}}
			]},
			{ $and:[
				{"day":"3"},{"begin":{$lte:4}}
			]}	
		]}	
	},
{$group:{ _id:{
	latLong: "$latLong",
	day: "$day",
	begin: "$begin",
},
	meetDay : { $push: "$day"},
	meetBegin: { $push: "$begin"}
}	
},
{$group:{ _id : {
	latLong : "$_id.latLong"},
	meetingGroups: { $push: { timeinfo : "$_id", day : "$day", begin: "$begin"}}
	}
}
*/
		]).toArray(function(err, docs){
		if(err){console.log(err)}	
		else{
			resp.push(docs)
			}
			db.close();
					console.log(resp)
			        //console.log(new Date() - datetimeStart);

		})

})
