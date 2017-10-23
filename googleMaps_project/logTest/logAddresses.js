var cheerio = require('cheerio');
var fs = require('fs');

var blank = new RegExp("^\s*$");

for(var i=1;i<=10;i++){
	var index = i<10 ? '0'+i : i; 
	var file = fs.readFileSync('../data/AAhtml_'+index+'.txt');
	
	var $ = cheerio.load(file);
	var tr = $('tr', 'tbody');
	
	tr.each(function(i,el){
		$(el).children().first()
		.each(function(i, el){
			el.children.forEach(function(child, i){
				if(child.type == "text" && child.data != blank.test(child.data)){
					if(i == 6){
						var splitter = child.data.trim().indexOf(",")
						console.log(child.data.trim().slice(0,splitter));
					}else{
						var state = "NY, ";
						console.log(state.concat(child.data.trim().slice(-5)));
					}
				}
			})
		})
	})
}


/* with RegEx */

//var step1 = child.data.trim().replace(/\(.*\)[,|" "]/,"");
//console.log(step1.trim().replace(/[^0-9]*/g,""))
