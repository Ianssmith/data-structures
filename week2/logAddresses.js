var cheerio = require('cheerio');
var fs = require('fs');

//var file = fs.readFileSync('../data/AAhtml_'+index+'.txt');
var file = fs.readFileSync('../data/AAhtml_08.txt');

var $ = cheerio.load(file);


var res = $('td', 'tbody').each(function(i, el){
			console.log($(el).text());
	})



