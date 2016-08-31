var async = require('async');
var request = require('request');
var fs = require('fs');

var pages = {};

for(var i=1;i<=10;i++){
	if(i<10){
	pages[i] = 'http://www.nyintergroup.org/meetinglist/meetinglist.cfm?zone=0'+i+'&borough=M'
	}else{
	pages[i] = 'http://www.nyintergroup.org/meetinglist/meetinglist.cfm?zone='+i+'&borough=M'
	}
}
//console.log(pages);
	async.each(pages, getpages);//request().pipe(fs.createWriteStream('doodle.txt')),console.log("hi"));

function getpages(url){
	request(url).pipe(fs.createWriteStream('doodle.txt'));
}

	//.pipe(fs.createWriteStream('doodle.txt'));//, function (error, response, body) {
		//if (!error && response.statusCode == 200) {
			//fs.ReadStream.on('open', function(stream){
				//fs.writeFileSync('data/test.txt', body);
		//}else{console.log("error");}
	//})
