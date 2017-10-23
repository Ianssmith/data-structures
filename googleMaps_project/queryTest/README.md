Querying the Mongo DataBase: 

Query Results from initial data structures:

```
 [ { _id: 57f427356f995506fedafea7,
    Time: 'Tuesday 7:00 pm to 9:00 pm',
    Location: '448 College Avenue, Bronx NY 10451',
    Group: 'GRUPO HASTA AQUI LLEGAMOS (Group #22110), Atras de CTown 3rd Avenue (un bloce)',
    Region: 'Melrose',
    Type: 'Closed Spanish Wheelchair Accessible',
    'Location Notes': 'Entre btw 145th and 146th Streets',
    address: '207+West+96th+Street,+New+York,+NY',
    latLong: { lat: 40.7944661, lng: -73.9706389 } },
  { _id: 57f427356f995506fedafeb6,
    Time: 'Tuesday 7:00 pm to 8:00 pm',
    Location: 'Beth Israel Hospital , 10 Nathan D Perlman Place New York NY 10003',
    Group: 'SURVIVORS IN SOBRIETY (Group #4), Focus is on dealing with cancer in recovery All are welcome',
    Region: 'East Village',
    Type: 'Open Topic Discussion Wheelchair Accessible',
    'Location Notes': 'Karpas Cancer Center Library 4th Floor Enter thru Room 4A to go to #4A18',
    address: '244+East+58th+Street,+New+York,+NY',
    latLong: { lat: 40.7600109, lng: -73.96544 } },
  { _id: 57f427356f995506fedafeba,
    Time: 'Tuesday 7:00 pm to 8:00 pm',
    Location: 'Church of St Paul & St Andrew, 263 West 86th Street New York NY 10024',
    Group: 'WEST END (Group #15320)',
    Region: 'Upper West Side',
    Type: 'Beginner Wheelchair Accessible',
    'Location Notes': '1st Floor,@Corner of West End Avenue & 86th Street',
 ...
```

Updated query results:



```
[{"_id":"585aa8d949fe4e4d2d5ad2c5",
"Time":"7:00 pm  to 8:00 pm",
"Location":"411 East 12th Street  411 E 12th StNew York, NY 10009",
"Group":"THE 12TH STREET WORKSHOP #14816",
"day":2,
"begin":19,
"address":"411+east+12th+street+new+york+ny+10009+usa",
"latLong":{"lat":40.7298724,"lng":-73.9827759}},
{"_id":"585aa8d949fe4e4d2d5ad2c6",
"Time":"7:00 pm  to 8:00 pm",
"Location":"Addiction Institute  306 West 102nd StreetNew York, NY 10025",
"Group":"WESTSIDE 11TH STEP MEDITATION WORKSHOP #15325",
"day":2,
"begin":19,
"address":"306+west+102nd+street+new+york+ny+10025+usa",
"latLong":{"lat":40.7991395,"lng":-73.9711355}},
...
```
