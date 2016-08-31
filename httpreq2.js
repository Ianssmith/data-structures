//var async = require('async');
var request = require('request');
var fs = require('fs');

//var pages = {};

for(var i=1;i<=10;i++){
	if(i<10){
		request('http://www.nyintergroup.org/meetinglist/meetinglist.cfm?zone=0'+i+'&borough=M', function(error,response,body){
			if(!error && response.statusCode == 200){
				fs.appendFileSync('doodle.txt', body);
			}else{console.log("error");}
		})
	}else{
		request('http://www.nyintergroup.org/meetinglist/meetinglist.cfm?zone='+i+'&borough=M', function(error,response,body){
			if(!error && response.statusCode == 200){
				fs.appendFileSync('doodle.txt', body);
			}else{console.log("error");}
		})
	}
//console.log(pages);
	//async.each(pages, getpages);//request().pipe(fs.createWriteStream('doodle.txt')),console.log("hi"));

//function getpages(url){
	//request(url).pipe(fs.appendFileSync('doodle.txt',url));
//}

	//.pipe(fs.createWriteStream('doodle.txt'));//, function (error, response, body) {
		//if (!error && response.statusCode == 200) {
			//fs.ReadStream.on('open', function(stream){
				//fs.appendFileSync('data/test.txt', body);
		//}else{console.log("error");}
	//})
}
