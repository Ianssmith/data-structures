var request = require('request');
var fs = require('fs');


	for(var i=1;i<=10;i++){
		if(i<10){
			request.get('http://visualizedata.github.io/datastructures/data/m0'+i+'.html')
				.on('error', function(err){
					console.log(err);
				}).pipe(fs.createWriteStream('data/AAhtml_0'+i+'.txt'));
		}else{
			request.get('http://visualizedata.github.io/datastructures/data/m'+i+'.html')
				.on('error', function(err){
					console.log(err);
				}).pipe(fs.createWriteStream('data/AAhtml_'+i+'.txt'));
		}
}
