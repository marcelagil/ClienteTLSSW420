// Always use JavaScript strict mode.
"use strict";

// Modules required here
var wpi = require('node-wiring-pi');

var sensor = 0;
wpi.setup('wpi');
wpi.pinMode(sensor, wpi.INPUT);
var seqNo = 0;
setInterval(function () {
console.log("La medida del sensor es", wpi.digitalRead(sensor));
var status;
	if(wpi.digitalRead(sensor) == 1){
		console.log("Movement Detected");
		status = 1;
		//let ts = new Date();

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
            //}, 100);
        });
   
        c1.on('disconnect', function (err) {
            console.log('Servidor desconectado o error en la conexión');
        });
   
        console.log('STARTED');
    }
    else {
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
		}var medicion= {
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
//});
}, 6000); 
