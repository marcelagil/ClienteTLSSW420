'user strict';

var wpi = require('node-wiring-pi');
var sensor = 0;
var tiempoTotal=600000;
var tiempoEntreMedicion=1000;
var maxMediciones=(tiempoTotal/tiempoEntreMedicion)-2; 
contador=0;
wpi.setup('wpi');
wpi.pinMode(sensor, wpi.INPUT);

function TestVibration(){
	contador=contador+1;
	var status;
	let ts = Date.now();	
	if(wpi.digitalRead(sensor) == 1){
		
		console.log("Movement Detected");
		status = 1;
		//let ts = new Date();
		
	}else{
		console.log("no Movement Detected");
		status = 0;
	}
	var data = JSON.stringify({ client: 'raspberry 2', status: status,  timestamp: new Date() });

	console.log(data);

	if (contador>maxMediciones) {
		process.exit();
	}
	setTimeout(function(){ TestVibration() }, tiempoEntreMedicion);
};
setTimeout(function(){ TestVibration() }, 200);
