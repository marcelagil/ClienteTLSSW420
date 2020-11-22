// Prueba de INA219
'user strict';

var ina219 = require('ina219');
var wpi = require('node-wiring-pi');

var Volts = 0;
var Current = 0;

var sensor = 0;
wpi.setup('wpi');
wpi.pinMode(sensor, wpi.INPUT);
 
ina219.init();
ina219.enableLogging(true);

ina219.calibrate32V1A(function () {
    
  ina219.getBusVoltage_V(function (volts) {
      
    console.log("Voltage: " + volts);
    Volts = volts;
    ina219.getCurrent_mA(function (current){
  			
      console.log("Current (mA): " + current );
      Current = current;
    });	
  });
});

console.log("Voltage: " + Volts);
console.log("Current (mA): " + Current );



function TestVibration(){
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
	setTimeout(function(){ TestVibration() }, 200);
};
setTimeout(function(){ TestVibration() }, 200);
