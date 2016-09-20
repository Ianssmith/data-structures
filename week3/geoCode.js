var async = require("async");
var fs = require("fs");
var request = require("request")
var cheerio = require("cheerio")
var addresses = [];
var uris = [];
var pages = [];
var state = ", New York, NY";
var file = fs.readFileSync("site.html");

var blank = new RegExp("^\s*$");

			//request("http://meetings.nyintergroup.org/", function(err, response, body){

	/***** scrape URI's into array *****/
	var $ = cheerio.load(file);
	var td = $("td[class=name]");
	td.each(function(i,el){
		$(el).children().each(function(i,child){
			uris.push($(child).attr("href"))
		})
	})

	/***** scrape addresses into array *****/
	var td = $("td[class=address]");
	td.each(function(i,el){
		addresses.push($(el).text().concat(state).replace(/ +/g,"+"));
	})

	/***** scrape meeting page code *****/
		/*
		var i=1;
		async.eachSeries(uris, function(value,callback) {
			request(value, function(err, resp, body){
				if(err){throw err;}
				fs.writeFileSync("pageCode/meeting"+i+".html", body)
				i++;
			})
		   setTimeout(callback, 100);
	}, function() {
		    console.log("done");
	});
		*/
for(var k=1;k<uris.length;k++){
	file = fs.readFileSync("pageCode/meeting"+k+".html");
	var $ = cheerio.load(file);
	
	$("dl",".col-md-4").each(function(i, el){
		if(el.data != blank.test(el.data))
		console.log($(el).text().trim().replace(/ +/g,"_"));
		//console.log("__________________");
	})	
}


	
	


//})
