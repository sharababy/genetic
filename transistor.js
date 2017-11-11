function makeCircuit(circuit){

			var canvas = document.getElementById("circuit");
			var ctx = canvas.getContext("2d");

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.beginPath();
			ctx.moveTo(285,10);
			ctx.lineTo(315,10);
			ctx.moveTo(300,10);
			ctx.lineTo(300,30); // T formation


			makeTransistor(ctx,260,30,1)  // must pmos

			ctx.moveTo(300,80); // output line
			ctx.lineTo(390,80);
			ctx.moveTo(300,80); // mid axis
			ctx.lineTo(300,100); // input starts 

			makeTransistor(ctx,260,510,2) // must nmos




			/*
				distance between nodes : height of transistor = 50
				width of transistor = 40

				input starts at 300,100
				input can end at 300,510

				circuit height = 410

			*/
			var nodalDistance = parseInt(410/(circuit.length));
			var unitDepths = [];
			for (var i = 0; i < circuit.length; i++) {
				unitDepths[i] = 0;
			}

			circuit.sort(
				function(e1,e2){

					return (e1.drain - e1.source)-(e2.drain - e2.source)
				}
				)

			console.log(circuit);

			var depth = 0;
			var depthCount = 1;			

			for (var i = 0; i < circuit.length; i++) {
				
				var startY = circuit[i].source * nodalDistance;
				var endY = circuit[i].drain * nodalDistance;

				if ((circuit[i].drain - circuit[i].source ) > 1) {
					depth = depthCount * 45;
					depthCount++;
				}
				else if((circuit[i].drain - circuit[i].source ) == 1){
					depth = unitDepths[circuit[i].source]
					unitDepths[circuit[i].source] += 45;
					console.log(circuit[i].source,unitDepths,depth);
				}

				makeWiredTransistor(ctx,2,depth,100+startY,90+endY,nodalDistance)

				depth = 0;
			}

			ctx.moveTo(300,560); // the ground symbol
			ctx.lineTo(300,580); 
			ctx.moveTo(290,580);
			ctx.lineTo(310,580);
			ctx.moveTo(293,585);
			ctx.lineTo(307,585);
			ctx.moveTo(296,590);
			ctx.lineTo(304,590);

			ctx.stroke();

}


function makeWiredTransistor(ctx, type, depth, startY, endY, nodalDistance){

	
	ctx.moveTo(300,startY); // depth line horizontal
	ctx.lineTo(300-depth,startY);
	
	makeTransistor(ctx, 300-depth-40, startY, type);

	ctx.moveTo(300-depth, startY+50); // after line vertical
	ctx.lineTo(300-depth,endY);

	ctx.lineTo(300,endY); // after line horizontal
	ctx.lineTo(300,endY+10) // small connection line


}


// type 1 = pmos
// type 2 = nmos

function makeTransistor(ctx,x,y,type){
	

	ctx.moveTo((x+40),(y+0)); // start line
	ctx.lineTo((x+40),(y+10));

	ctx.lineTo((x+23),(y+10)); // transistor body
	ctx.lineTo((x+23),(y+40));
	ctx.lineTo((x+40),(y+40));
	ctx.lineTo((x+40),(y+50));

	ctx.moveTo((x+18),(y+10)); // topper line for n-mos 1
	ctx.lineTo((x+18),(y+40));

	if (type === 2) {
		ctx.moveTo((x+18),(y+25)); // perpendicular line in nmos 1
		ctx.lineTo((x+0),(y+25));
	
	}
	else if(type === 1){
		ctx.moveTo((x+12),(y+25)); // perpendicular line in nmos 1
		ctx.lineTo((x+0),(y+25));
		
		ctx.moveTo(x+18,y+25);
		ctx.arc(x+15,y+25,3,0,2*Math.PI);
			
	}

	
			
}



