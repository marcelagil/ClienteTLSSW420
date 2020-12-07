// Prueba de INA219
'user strict';

var wpi = require('node-wiring-pi');
var sensor = 0;
var tiempoEntreMedicion=1000;
wpi.setup('wpi');
wpi.pinMode(sensor, wpi.INPUT);

function TestVibration(){
	var status;
	let ts = Date.now();	
	console.log("Antes");
	if(wpi.digitalRead(sensor) == 1){
		
		console.log("Movement Detected");
		status = 1;
		//let ts = new Date();
		
	}else{
		console.log("no Movement Detected");
		status = 0;
	}
	console.log("Despues");
	var data = JSON.stringify({ client: 'raspberry 2', status: status,  timestamp: new Date() });

	console.log(data);
	setTimeout(function(){ TestVibration() }, tiempoEntreMedicion);
};
setTimeout(function(){ TestVibration() }, 200);
