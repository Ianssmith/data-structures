//var async = require('async');
//const querystring =require('querystring');
var request = require('request');
var fs = require('fs');

//var boros = {borough:["BX","BK","M","Q","SI","N","SF","W","R","O","PD","SGU","NJ","C"]};


//for(var j=0;j<=14;j++){
	for(var i=1;i<=10;i++){
		if(i<10){
			//request('http://www.nyintergroup.org/meetinglist/meetinglist.cfm?zone=0'+i+'&borough='+boros.borough[j], function(error,response,body){
			request('http://visualizedata.github.io/datastructures/data/m0'+i+'.html', function(error,response,body){
				if(!error && response.statusCode == 200){
					fs.appendFileSync('data/AAhtml_alt.txt', body);
					//fs.writeFileSync('data/AAhtml_'+boros.borough[j]+i+'.txt', body);
				}else{console.log("error");}
			})
		}else{
			//request('http://www.nyintergroup.org/meetinglist/meetinglist.cfm?zone='+i+'&borough='+boros.borough[j], function(error,response,body){
			request('http://visualizedata.github.io/datastructures/data/m'+i+'.html', function(error,response,body){
				if(!error && response.statusCode == 200){
					fs.appendFileSync('data/AAhtml_alt.txt', body);
					//fs.writeFileSync('data/AAhtml_'+boros.borough[j]+i+'.txt', body);
				}else{console.log("error");}
			})
		}
	//}
}

//var boroArray = [];
//boroArray.push(querystring.stringify(boros.borough[i]));
//var test = querystring.stringify(boros.borough[0]);
//console.log(test);
//console.log(boroArray[i]);

//request('http://www.nyintergroup.org/meetinglist/meetinglist.cfm?'+querystring.stringify(boros.borough[i-1]), function(error,response,body){
	//if(!error && response.statusCode == 200){
		//fs.appendFileSync('data/AAhtml.txt', body);
	//}else{console.log("error");}
//})



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
