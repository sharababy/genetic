function makeCircuit(circuit){

			var canvas = document.getElementById("circuit");
			var ctx = canvas.getContext("2d");
			ctx.beginPath();
			ctx.moveTo(235,30);
			ctx.lineTo(265,30);
			ctx.moveTo(250,30);
			ctx.lineTo(250,80); // T formation

			/*
				distance between nodes : height of transistor = 50
				width of transistor = 40
			*/

			makeTransistor(ctx,10,10)


			ctx.moveTo(250,420); // the ground symbol
			ctx.lineTo(250,440); 
			ctx.moveTo(240,440);
			ctx.lineTo(260,440);
			ctx.moveTo(243,445);
			ctx.lineTo(257,445);
			ctx.moveTo(246,450);
			ctx.lineTo(254,450);

			ctx.stroke();

}


function makeTransistor(ctx,x,y){
	

	ctx.moveTo((x+40),(y+0)); // start line
	ctx.lineTo((x+40),(y+10));

	ctx.lineTo((x+23),(y+10)); // transistor body
	ctx.lineTo((x+23),(y+40));
	ctx.lineTo((x+40),(y+40));
	ctx.lineTo((x+40),(y+50));

	ctx.moveTo((x+18),(y+10)); // topper line for n-mos 1
	ctx.lineTo((x+18),(y+40));

	ctx.moveTo((x+18),(y+25)); // perpendicular line in nmos 1
	ctx.lineTo((x+0),(y+25));

			
}
