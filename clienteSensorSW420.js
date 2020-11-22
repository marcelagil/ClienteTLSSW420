// Always use JavaScript strict mode.
"use strict";

// Modules required here

var sensor = require('node-dht-sensor');
var seqNo = 0;
setInterval(function () {
var status;
	let ts = Date.now();	
	if(wpi.digitalRead(sensor) == 1){
		console.log("Movement Detected");
		status = 1;
		//let ts = new Date();
        var seqNo = 0;
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
            console.log('Servidor desconectado');
        });
   
        /*c1.on('message', function (message) {
            console.log("Tag = ", message.tag);
            console.log("Date = ", message.date);
            if (message.seqNo !== seqNo) {
                console.log ("Sequence number error, expected: ", seqNo);
                process.exit();
            }
            if ((message.seqNo % 100) === 0) {
                console.log (process.memoryUsage());
            }
            seqNo += 1;
        });*/
   
        console.log('STARTED');
    }
    else {
		console.log("no Movement Detected");
        var TLSClient = require('./tls-client.js');
        var c1 = new TLSClient('agent1', 8000);        
        c1.on('connect', function (err) {
        console.log('Cliente conectado -- sensor desconectado');
        //setInterval(function () {
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
                "medida ": {
					"Movimiento": 0,
                },
                "alerta" : false,
                "observaciones" : "Sin movimiento"
            };
            console.log("segNo: ", medicion); 
            c1.write (medicion);
            var seqNo=+1;
            //}, 100);

        });
               
        c1.on('disconnect', function (err) {
            console.log('Servidor desconectado');
        });              
       /*c1.on('message', function (message) {  
            console.log("Tag = ", message.tag);
            console.log("Date = ", message.date);
            //if (message.seqNo !== seqNo) {
                //console.log ("Sequence number error, expected: ", seqNo);
                //process.exit();
            //}
            if ((message.seqNo % 100) === 0) {
                console.log (process.memoryUsage());
            }
        });*/
            console.log('STARTED');
                //});
        }
});
}, 6000); 
