// Always use JavaScript strict mode.
"use strict";

// Modules required here
var wpi = require('node-wiring-pi');

var sensor = 0;
wpi.setup('wpi');
wpi.pinMode(sensor, wpi.INPUT);
var seqNo = 0;
var maxMediciones=100;

function TestVibration(){
	var status;
	let ts = Date.now();	
	if(wpi.digitalRead(sensor) == 1){
		
		console.log("Movement Detected");
		status = 1;
        var TLSClient = require('./tls-client.js');
        var c1 = new TLSClient('agent1', 8000);
        c1.on('connect', function (err) {
            console.log('Cliente conectado-sensor conectado');
            seqNo= seqNo+1;
			console.log(seqNo);
			if (seqNo>maxMediciones) {
				process.exit();
			}
			var medicion= {
				"sensor" :{
					"id":2,
					"tipo":"SW420"
				},
				"dispositivo":{
					"id":2,
					"tipo":"Raspberry Pi 3"
				},
				"fecha" : new Date(),
				"medida": {
					"Movimiento": 1,
				},
				"alerta" : true,
				"observaciones" : ""
			};
			console.log("segNo: ", medicion); 
			c1.write (medicion);
        });
   
        c1.on('disconnect', function (err) {
            console.log('Servidor desconectado o error en la conexión');
        });
        console.log('STARTED');
		
	}else{
		console.log("no Movement Detected");
		status = 0;
			console.log("No se detecta movimiento");
        var TLSClient = require('./tls-client.js');
        var c1 = new TLSClient('agent1', 8000);        
        c1.on('connect', function (err) {
        console.log('Cliente conectado -- sensor sin movimiento');
        seqNo= seqNo+1;
		console.log(seqNo);
		// si el sensor alcanza el numero máximo de medidas definidas se cierra el programa
		if (seqNo>maxMediciones) {
			process.exit();
		}
		var medicion= {
                "sensor" :{
					"id":2,
					"tipo":"SW420"
				},
				"dispositivo":{
					"id":2,
					"tipo":"Raspberry Pi 3 Model B+"
				},
                "fecha" : new Date(),
                "medida ": {
					"Movimiento": 0,
                },
                "alerta" : false,
                "observaciones" : "Sin movimiento"
            };
            console.log("segNo: ", medicion); 
            c1.write (medicion);

        });
               
        c1.on('disconnect', function (err) {
            console.log('Servidor desconectado o error en la coneccion');
        });              

            console.log('STARTED');
	}
	var data = JSON.stringify({ client: 'raspberry 2', status: status,  timestamp: new Date() });

	console.log(data);
	setTimeout(function(){ TestVibration() }, 6000);
};
setTimeout(function(){ TestVibration() }, 2);
