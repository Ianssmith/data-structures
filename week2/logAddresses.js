var cheerio = require('cheerio');
var fs = require('fs');

var reggie = new RegExp("^\s*$");

for(var i=1;i<=10;i++){
	var index = i<10 ? '0'+i : i; 
	var file = fs.readFileSync('../data/AAhtml_'+index+'.txt');
	
	var $ = cheerio.load(file);
	var tr = $('tr', 'tbody');
	
	tr.each(function(i,el){
		$(el).children().first()
		.each(function(i, el){
			el.children.forEach(function(child, i){
				if(child.type == "text" && child.data != reggie.test(child.data)){
					console.log(child.data.trim());
				}
			})
		})
	})
}
