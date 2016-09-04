var request = require('request');
var fs = require('fs');



	for(var i=1;i<=10;i++){
		if(i<10){
				if(!error && response.statusCode == 200){
					fs.appendFileSync('data/AAhtml_alt.txt', body);
				}else{console.log("error");}
			})
		}else{
				if(!error && response.statusCode == 200){
					fs.appendFileSync('data/AAhtml_alt.txt', body);
				}else{console.log("error");}
			})
		}
}
