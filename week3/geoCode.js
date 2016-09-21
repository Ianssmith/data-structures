var async = require("async");
var fs = require("fs");
var request = require("request")
var cheerio = require("cheerio")
var addresses = [];
var uris = [];
var pages = [];
var meetingInfo = [];
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
		meetingInfo.push($(el).text().trim().replace(/,/g,"").replace(/\t+/g,"").replace(/\n+/g,"___").replace(/ +/g," "));
		//console.log("__________________");
	})	
}

for(var j=0;j<meetingInfo.length;j++){
	meetingInfo[j] = meetingInfo[j].split("___");
}

//for(var r=0;r<meetingInfo[r].length;r++){
//	var temp = meetingInfo[r].slice(3,5)
//	var temp2 = temp.toString();
//	console.log(temp2);
//	meetingInfo[r].splice(3,temp2)
//	}

//for(var r=0;r<meetingInfo[r].length;r++){
	//for(var l=0;l<meetingInfo[1][l].length;l++){
	//console.log(meetingInfo[r][l]);
	//}
//}

	console.log(meetingInfo);

	
	


//})
