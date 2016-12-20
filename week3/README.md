This is where most of the work for the first project was done 
I approached it in stages, by extracting specifc peices of data into seperate arrays and cleaning them in the process 
and then looping through those and combining them into their respective objects.

-I'm not sure if this is the best approach but it was the part of the project that I thought worked best for me

-The defining lesson from this project was learning the importance of validating and testing the output;
If each stage builds upon the previous small errors can send the entire thing into a nose dive later on.

-I sort of ended up doing this project twice because of it.
The first time everything ended up working and I had a nice data base filled with this data:

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
	
-That done, I was then off onto the working with the sensor and postgres, but I did not realize until later that in a rush I had copied and pasted the website url from the landing page which defaulted to meetings for the current day and not "any" day. So I had the data only for Tuesdays;

-By this time the site had changed enough that my processing page would not format all the addresses well enough for the google api and it would miss a few of the new addresses. So I had to redo the initial part; In the process I took the oportunity to add in reformmating functions for the day of the week and the time of day;

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

-In order to not query the website too much I saved my inital request into a file and ws pulling from there unforunatley the above result was pulling the 'day' value from an older file and so they were incorrect almost across the board.

-So I went back again to fix it but in the process of finding the problem I rewrote the data for each of the meetings I was pulling from. Normally this
would not have mattered but it turns out that in the meantime they had changed the structure of their website again. 
-So this time I had to go back and re-write the entire second part to finally get:

	```
	[{"Time":"2:00 am  to 3:15 am",
	"Location":"220 West Houston Street  220 West Houston StreetNew York, NY 10014",
	"Group":"MIDNITE #12920",
	"day":6,
	"begin":2,
	"address":"220+west+houston+street+new+york+ny+10014+usa",
	"latLong":{"lat":40.7287153,"lng":-74.004578}},
	```

-So far at least it seems as if this time the data is finally whole. Needless to say I could have saved myself hours of time and confusion if I had just double checked the result of the process the first time before moving on to the next project. 



