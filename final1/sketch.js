var usq= {"lat" : 40.7385105,"lng" : -73.98697609999999}

var socket = io('http://localhost:8080')
socket.on('news',function(data){
console.log(data)
}

	function initMap(){
		var map = new google.maps.Map(document.getElementById('map'),{
			zoom:4,
			center:usq
		});
	
		for(var i=0;i<data.length;i++){
			var cont = '<div class="group">'+data[i].Group+'</div>'+'<div class="group">'+data[i].Time+'</div>'+'<div class="group">'+data[i].Location+'</div>'+'<div class="group">'+data[i].Type+'</div>';
	
			var infowindow = new google.maps.InfoWindow({
				content: cont
			});
			var marker = new google.maps.Marker({
				position: data[i].latLong,
				map:map,
				title: data[i].Group 
			});
			marker.addListener('click', function(){
				infowindow.open(map, marker);
			});
		}
	}
//}
