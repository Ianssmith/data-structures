//modules
var async = require("async");
var fs = require("fs");
var request = require("request")
var cheerio = require("cheerio")

//globals
var addresses = [];
var uris = [];
var pages = [];
var meetingInfo = [];
var meetingKey = [];
var state = ", New York, NY";
var file = fs.readFileSync("site.html");
var apiKey = process.env.GMAKEY;


var blank = new RegExp("^\s*$");

	/***** scrape site html into file (site.html) *****/
			//request("http://meetings.nyintergroup.org/", function(err, response, body){

	/***** scrape URI's into array *****/
	var $ = cheerio.load(file);
	var td = $("td[class=name]");

	td.each(function(i,el){
		$(el).children().each(function(i,child){
			uris.push($(child).attr("href"));
		})
	});


	/***** scrape addresses into array *****/
	var td = $("td[class=address]");
	td.each(function(i,el){
		addresses.push($(el).text().concat(state).replace(/ +/g,"+"));
	});


	//console.log(addresses);


	/***** scrape meeting page code and put in files (pageCode/) *****/
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

/****** import page code files *****/

for(var k=1;k<=uris.length;k++){
	file = fs.readFileSync("pageCode/meeting"+k+".html");
	var $ = cheerio.load(file);

/****** seperate page info into two arrays to be combined as objects *****/
	
	$("dt","dl").each(function(i, el){
		if(el.data != blank.test(el.data))
		meetingKey.push($(el).text().trim().replace(/,/g,"").replace(/\t+/g,"").replace(/\n+/g,"___").replace(/ +/g," "));
		//console.log("__________________");
	})	

	$("dd","dl").each(function(i, el){
		if(el.data != blank.test(el.data))
		meetingInfo.push($(el).text().trim().replace(/,/g,"").replace(/\t+/g," ").replace(/\n+/g,"___").replace(/ +/g," "));
		//console.log("__________________");
	})	
}

for(var j=0;j<meetingKey.length;j++){
	meetingKey[j] = meetingKey[j].split("___");
}
for(var j=0;j<meetingInfo.length;j++){
	meetingInfo[j] = meetingInfo[j].split("___");
}


//console.log(meetingKey)
//console.log(meetingInfo)

/***** combine arrays into objects and put in object array (codeobj.txt)*****/

var objArray = [];

var i=0;
var place = 0;
for(var t=0;t<uris.length;t++){
		objArray[t] = new Object();
	
	for(i=place;i<meetingInfo.length;i++){
		if(meetingKey[i] != 'Last Contact Date'){
		place++;
			objArray[t][meetingKey[i]] = meetingInfo[i].toString();
		}else{
			place++;
			break}
	}
}

		
for(var i=0;i<objArray.length;i++){
	objArray[i]["Location"] = objArray[i]["Location"].replace(/\s*\(.*?\)\s*/g, "")
}
		
//console.log(objArray);

/***** add addresses from array scraped earlier to respective objects *****/

for(var i=0;i<objArray.length;i++){
	objArray[i].address = addresses[i];
}

//console.log(objArray);

/*****request geo coords from googmaps and put into file (googObj.json)*****/

async.eachSeries(objArray, function(value, callback) {
	var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.address + '&key=' + apiKey;
	request(apiRequest, function(err, resp, body) {
		if (err) {throw err;}
			value.latLong = JSON.parse(body).results[0].geometry.location;
		});
	setTimeout(callback, 1000);
},function() {
	    console.log((objArray));
});
