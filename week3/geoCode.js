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
var oldfile = fs.readFileSync("codeobj.json");
var apiKey = process.env.GMAKEY;


var blank = new RegExp("^\s*$");

	/***** scrape site html into file (site.html) *****/
			//request("http://meetings.nyintergroup.org/", function(err, response, body){	old version
			//request("http://meetings.nyintergroup.org/?d=any&v=list", function(err, response, body){  //full site
				//request("http://meetings.nyintergroup.org/?d=any&r=1864&v=list", function(err, response, body){  //manhattan
				//console.log(body)
				//})
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
		//console.log(el)
		//console.log("_______")
		addresses.push(el.attribs["data-sort"].split("-").slice(0,-2))
		//time.push(el.attribs["data-sort"].split("-").pop())
	});

	var day = [];
	var td = $("td[class=time]");
	td.each(function(i,el){
		//console.log(el)
		//console.log("_______")
		day.push($(el).find('span').first().text())
	});
	//console.log(time)


	//console.log(prob);
	//NOTE: manhattan logs 1191 meeting page urls


	/***** scrape meeting page code and put in files (pageCode/) *****/
		/*
		var i=1;
		async.eachSeries(uris, function(value,callback) {
			request(value, function(err, resp, body){
				if(err){throw err;}
				fs.writeFileSync("pageCode/meeting"+i+".html", body)
				i++;
			})
		   setTimeout(callback, 1000);
	}, function() {
		    //console.log("done");
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
/**** they updated the site again and  the above code no longer works import in old page code results from codeobj.txt ******/
//console.log(JSON.parse(oldfile))

//var objArray = [];

/*
var i=0;
var place = 0;
for(var t=0;t<uris.length-1;t++){
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
*/

//console.log(objArray[objArray.length-1].Location);
//console.log(objArray[objArray.length-1])
		
//for(var i=0;i<objArray.length;i++){
	//objArray[i]["Location"] = objArray[i]["Location"].replace(/\s*\(.*?\)\s*/g, "")
	//objArray[i]["Location"] = objArray[i]["Location"].split(",")
	//objArray[i]["Location"] =  objArray[i]["Location"][1]
//}
var objArray = JSON.parse(oldfile)		



/***** add addresses from array scraped earlier to respective objects *****/
/***** create an array of uniq addresses  *****/
var days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

var uniqadds = []

for(var i=0;i<objArray.length;i++){
	objArray[i]["Location"] = objArray[i]["Location"].replace(/\s*\(.*?\)\s*/g, "")
	objArray[i].day = day[i];
	//objArray[i].day = objArray[i].Time.split(" ").shift()
		for(var d=0;d<days.length;d++){
			if(objArray[i].day == days[d]){objArray[i].day = d}
		}
	objArray[i].begin = objArray[i].Time.split(" ").slice(1,3)
		 var temp = objArray[i].begin[0].split(":") 
				if(temp[0] ==="Noon" ){
					temp[0] = "12"
				}
				if(temp[0] === "Midnight"){
					temp[0] = "0"
				}
				 if(temp[1] === undefined){
					 temp[1] = "00";
				}	
			if(objArray[i].begin[1] === "pm" && parseInt(temp[0]) < 12 && parseInt(temp[0]) > 0){
				temp[0] = parseInt(temp[0]) + 12
			}else{
				temp[0] = parseInt(temp[0])
			}

		 if(temp[1] === "00"){
			 temp[0] = temp[0] + 0.0
		 }else if(temp[1] === "15"){
			 temp[0] = temp[0] + 0.25
		 }else if(temp[1] === "30"){
			 temp[0] = temp[0] + 0.5
		 }else if(temp[1] === "45"){
			 temp[0] = temp[0] + 0.75
		}
		objArray[i].begin = temp[0]	
	objArray[i].Time = objArray[i].Time.split(" ").slice(1).join(" ")

	objArray[i].address = addresses[i].join("+")
	//saved into "testpart.txt"
	if(uniqadds.indexOf(objArray[i].address) === -1){
		uniqadds.push(objArray[i].address)
	}

}
//console.log(uniqadds.length)


//console.log(objArray);

//old version/*****request geo coords from googmaps and put into file (googObj.json)*****/
/*****request geo coords from googmaps and put into file array for matching with obj *****/
var i=0;
var geoArr = []
var R = []
var B = []

async.eachSeries(uniqadds, function(value, callback) {
	//console.log(value)
	var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value + '&key=' + apiKey;
	request(apiRequest, function(err, resp, body) {
		if (err) {throw err;}
	  		geoArr.push(JSON.parse(body).results[0].geometry.location)
		});
	setTimeout(callback, 2000);
},function() {

for(var i=0;i<objArray.length;i++){
	for(var j=0;j<uniqadds.length;j++){
		if(objArray[i].address == uniqadds[j]){
			objArray[i].latLong = geoArr[j];
			console.log(JSON.stringify(objArray[i]))
		}
	}
}
});




