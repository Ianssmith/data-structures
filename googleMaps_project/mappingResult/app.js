 var dbName = "meetingBase";
 var collName = "meetdata";

var http = require("http");
var fs = require("fs");

var url = 'mongodb://' + process.env.mongoIP + ':27017/' + dbName;

var index1 = fs.readFileSync("index1.txt");
var index3 = fs.readFileSync("index3.txt");

// Retrieve
var MongoClient = require('mongodb').MongoClient;

var server = http.createServer(function(req, res) {

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}
        
        var dateTimeNow = new Date();
        var today = dateTimeNow.getDay();
        var tomorrow;
        if (today == 6) {tomorrow = 0;}
        else {tomorrow = today + 1}
        var hour = dateTimeNow.getHours() - 5;
    
        var collection = db.collection(collName);
    
        collection.aggregate([
            { $match : 
                { $or : [
                    { $and: [
                        { day : today } , { begin : { $gte: hour } }
                    ]},
                    { $and: [
                        { day : tomorrow } , { begin : { $lte: 4 } }
                    ]}
                ]}
            },
            { $group : { _id : {
                latLong : "$latLong",
                Group : "$Group",
                Location : "$Location",
				Time : "$Time"
                },
                    begin : { $push : "$begin" }, 
            }
            },
            
            // group meeting groups by latLong
            {
                $group : { _id : { 
                    latLong : "$_id.latLong"},
                    Group : { $push : {Group : "$_id", Time : "$Time"}}
                }
            }

		  ]).toArray(function(err, docs) { // end of aggregation pipeline
            if (err) {console.log(err)}
            
            else {
                res.writeHead(200, {'content-type': 'text/html'});
                res.write(index1);
                res.write(JSON.stringify(docs));
                res.end(index3);
            }
            db.close();
        });
    });
});

server.listen(8080, "127.0.0.1");
//server.listen(process.env.PORT);
