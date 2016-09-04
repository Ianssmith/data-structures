var request = require('request');
var fs = require('fs');


	for(var i=1;i<=10;i++){
		if(i<10){
			request('http://visualizedata.github.io/datastructures/data/m0'+i+'.html', function(error,response,body){
				if(!error && response.statusCode == 200){
					fs.appendFileSync('data/AAhtml_alt.txt', body);
				}else{console.log("error");}
			})
		}else{
			request('http://visualizedata.github.io/datastructures/data/m'+i+'.html', function(error,response,body){
				if(!error && response.statusCode == 200){
					fs.appendFileSync('data/AAhtml_alt.txt', body);
				}else{console.log("error");}
			})
		}
}

