var fs =require('fs');
var request = require('request');

for(var i=1;i<=10;i++){
	if(i<10){
		request('http://www.nyintergroup.org/meetinglist/meetinglist.cfm?zone=0'+i+'&borough=M', function(error, response, body){
		if(!error && response.statusCode ==200){
			console.log(body);
		}
		})
	}else{
		request('http://www.nyintergroup.org/meetinglist/meetinglist.cfm?zone='+i+'&borough=M', function(error, response, body){
			if(!error && response.statusCode ==200){
				console.log(body);
			}
	})
}
//	request('http://www.nyintergroup.org/meetinglist/meetinglist.cfm?zone=0'+i+'&borough=M', function (error, response, body) {
//		if (!error && response.statusCode == 200) {
//			console.log(body) 
//		}
//	})
}
