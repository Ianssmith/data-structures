var cheerio = require('cheerio');
var fs = require('fs');

//var file = fs.readFileSync('../data/AAhtml_'+index+'.txt');
var file = fs.readFileSync('../data/AAhtml_08.txt');

var $ = cheerio.load(file);
var reggie = new RegExp("^\s*$");


//var res = $('td','tr');
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



