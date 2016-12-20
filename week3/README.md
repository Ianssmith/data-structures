This is where most of the work for the first project was done.
I approached it in stages by extracting specific pieces of data into seperate arrays, cleaning them in the process,
and then looping through those arrays combining them into their respective objects.

-I'm not sure if this is the best approach, but it was the part of the project that I thought worked best for me.

-The underlying lesson I learned from this project was discovering the importance of validation and testing; Not only for 
confirming that your program works for as many foreseeable changes or inputs as possible, but if each stage builds upon the previous one, small errors can send the entire thing into a nose dive later on. 

-I sort of ended up doing this project twice because of it.
The first time everything ended up working nicely and I had a nice data base filled with data:
####Or so I thought

	```
	[{"Time":"Tuesday 2:00 am to 3:15 am",
	"Location":"220 West Houston Street, New York NY 10014",
	"Group":"MIDNITE (Group #12920)",
	"Region":"Greenwich Village",
	"Type":"Candlelight Open Topic Discussion",
	"Meeting Notes":"Pitch meeting.",
	"Location Notes":"2nd Floor. Between 6th Avenue & Varick Street.",
	"address":"220+West+Houston+Street,+New+York,+NY",
	"latLong":{"lat":40.7287153,"lng":-74.004578}}
	```
	
-That done, I was then off onto the working with the accelerometer and postgres. 

-I did not realize until later that in a rush I had copied and pasted the website url from the landing page which defaulted to meetings for the current day and not "any" day. So I had the data only for Tuesdays;

-By this time the site (recently undergoing construction) had changed enough that my processing page would not format all the addresses well enough for the google api and it would miss a few of the new addresses. So I had to redo the initial part; In the process I took the oportunity to add in some reformatting functions for the day of the week and the time of day;

	```
	[{"Time":"2:00 am to 3:15 am'",
	"Location":"'220 West Houston Street,220 West Houston StreetNew York NY 10014'",
	 "Group":"'MIDNITE (Group #12920)'",
	 "Region":"'Greenwich Village'",
	 "Type":"'Candlelight Open Topic Discussion'",
	 "'Meeting Notes'":"'Pitch meeting'",
	 "'Location Notes'":"'2nd Floor. Between 6th Avenue & Varick Street.'",
	 "day":6,
	 "begin":2,
	 "address":"220+west+houston+street+new+york+ny+10014+usa",
	 "latLong":{"lat":40.7287153,"lng":-74.004578}},
	```

-That being done I moved on to another task.

####..but it wasn't done.

-In order to not query the website too much I saved my inital request into files and was pulling from those. Unforunatley the above result was pulling the 'day' value from an older file and so they were all incorrect. Not a big problem I just had to re-run the processing script using the correct files.

-I went back to fix it and in the process of finding the problem I happened to requery and rewrite the data for each of the meetings from their site.
Normally this would not have mattered, but it turns out that in the meantime they had changed the structure of their website again so while all it took to fix the 'day' problem was a small tweak, the rest of the pipeline after (as the day formatting was in the beginning) was now completely useless with the new site.
-This time I had to go back and re-write almost the entire thing again to finally get:

	```
	[{"Time":"2:00 am  to 3:15 am",
	"Location":"220 West Houston Street  220 West Houston StreetNew York, NY 10014",
	"Group":"MIDNITE #12920",
	"day":6,
	"begin":2,
	"address":"220+west+houston+street+new+york+ny+10014+usa",
	"latLong":{"lat":40.7287153,"lng":-74.004578}},
	```

-So far at least, it seems as if this time the data is finally whole. Needless to say I could have saved myself hours of time and confusion if I had just double checked the result of the process the first time before moving on to the next project. 



