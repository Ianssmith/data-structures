var request = require('request');
var fs = require('fs');

for(var i=1;i<=10;i++){
	//request('http://www.nyintergroup.org/meetinglist/meetinglist.cfm?zone=00&borough=M', function (error, response, body) {
	request('http://www.nyintergroup.org/meetinglist/meetinglist.cfm?zone=0'+i+'&borough=M', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			fs.writeFileSync('data/AAhtml.txt', body);
			console.log("file 0"+i); 
				    }
	})
}
