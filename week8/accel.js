var five = require("johnny-five"),
	board = new five.Board();

board.on("ready", function() {
	var accelerometer = new five.Accelerometer({
		controller: "ADXL335",
		pins: ["A2", "A1", "A0"],
		//autoCalibrate:true
	});

	var wait = setInterval(getvals,200);
	
function getvals(){
	//accelerometer.on("change",function(){
		console.log("accelerometer");
		console.log("  x            : ", accelerometer.x);
		//console.log("  x            : ", this.x);
		console.log("  y            : ", accelerometer.y);
		console.log("  z            : ", accelerometer.z);
		console.log("  pitch        : ", accelerometer.pitch);
		console.log("  roll         : ", accelerometer.roll);
		console.log("  acceleration : ", accelerometer.acceleration);
		console.log("  inclination  : ", accelerometer.inclination);
		console.log("  orientation  : ", accelerometer.orientation);
		console.log("--------------------------------------");
	}
	//	})
});
