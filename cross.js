//cross.js

var sim = require('./sim.js')
const util = require('util')


function fitness(actual , target){

	var score = 0;
	for (var i = 0; i < actual.length; i++) {
		if (actual[i] == target[i]) {
			score++;
		}
	}
	return score;
}

/*

Batch Structure

[
	{
		circuit : [
			{
				gate:
				source:
				drain:
			}
			, ...	
		]
		output:[0 , 1 , 0 , ...]
	}

]
*/

// var tc = [ 
// 	{ gate: 0, source: 0, drain: 4 },
// 	{ gate: 1, source: 0, drain: 1 },
// 	{ gate: 2, source: 0, drain: 2 },
// 	{ gate: 3, source: 1, drain: 3 },
// 	{ gate: 4, source: 2, drain: 4 },
// 	{ gate: 5, source: 2, drain: 3 },
// 	{ gate: 6, source: 3, drain: 4 } ]

// var tc = [ 
// 	{ gate: 0, source: 0, drain: 4 },
// 	{ gate: 1, source: 0, drain: 1 },
// 	{ gate: 2, source: 0, drain: 2 },
// 	{ gate: 3, source: 1, drain: 3 },
// 	]

function getBatchFitness(batch){

	var target = t;
		
	for (var i = 0; i < batch.length; i++) {
		batch[i].score = fitness(batch[i].output , target)
	}
	return batch
}




function mutate(circuit){

	/*
	two types of mutation are possible
	0. take a parellel block and place it parellely elsewhere
	1. take a parellel block and append it to the end of the circuit
	2. take the last series block and make a parellel block
	*/
	var mIndex = -1;
	var mType = parseInt(Math.random()*100 + Math.random()*10)%2;
		
	var mutant = Object.assign({},circuit);

	if (mType === 0 || mType === 1) {

		
		var c = sim.getDuplicatePairs(mutant)



		//console.log(c)
		
		for (var i = 0; i < c.length; i++) {
			
			if (c[i].location.length > 1 ) {
				mIndex = i;
				break;
			}
		}

		if (mIndex != -1) {
			var gateIndex = c[mIndex].location[1]
			
			if (mType == 0) {
				var allNodes = sim.getAllNodes(mutant)
				mutant[gateIndex].source = sim.selectRandomlyFrom(allNodes)
				mutant[gateIndex].drain = sim.selectRandomlyFrom(allNodes)

				while(mutant[gateIndex].drain <= mutant[gateIndex].source){
					mutant[gateIndex].source = sim.selectRandomlyFrom(allNodes)
					mutant[gateIndex].drain = sim.selectRandomlyFrom(allNodes)
				}
			}
			else if(mType == 1){
				var maxDrains = sim.getMaxDrains(mutant)

				if (maxDrains[0].drain !== mutant.length) {
					mutant[gateIndex].source = maxDrains[0].drain;
					mutant[gateIndex].drain = mutant[gateIndex].source+1;
				}
			}
		}

		return mutant
		
	}

	else if(mType === 1){

		console.log("Working on it...")
	}

}




function achieveTarget(t , iterations , rounds){

	var batch = []
	var initSample;

	for (var j = 0; j < iterations; j++) {
			
		initSample = {}
		initSample.id = j;
		initSample.circuit = sim.getCircuitOfSize(parseInt(Math.log2(t.length)))
		initSample.output = sim.getOutputOf(initSample.circuit)
		initSample.score = fitness(initSample.output , t)

		batch.push(initSample)

		// console.log(initSample.circuit);
		// console.log()
		// console.log(initSample);
		// console.log()
		// console.log()

		
	}

	for (var i = 0; i < rounds-1; i++) {
		
		for (var j = 0; j < iterations; j++) {
			
			var sample = {}
			sample.id = (iterations*(i+1))+j;
			sample.circuit = mutate(batch[(iterations*i)+j].circuit)
			sample.output = sim.getOutputOf(sample.circuit)
			sample.score = fitness(sample.output , t)

			//console.log(sample)
			// console.log("Connectivity: ",sim.checkConnectivity(sample.circuit))
			// console.log("Sample Circuit: ",sample.circuit)

			batch.push(sample)
		}

	}

	var max = -1;
	var index = -1;

	for (var i = 0; i < rounds*iterations; i++) {
		
		if (batch[i].score > max) {
			max = batch[i].score
			index = i;
		}
	}

	
	//console.log("Index: ",index);

	//console.log(util.inspect(batch, false, null))


	
	return batch[index];
}

function startEvolution(t){

	var best;
	do{
		best = achieveTarget(t , 12000 , 60)
		console.log("Best Score:",best.score)

		console.log("Best Circuit:",best.circuit)
	}while(best.score != t.length)

	console.log("Best Circuit:",best)

	//console.log(sim.getOutputOf(best.circuit))


	return best.circuit
}

// var tc = [ 
// 	{ gate: 0, source: 0, drain: 2 },
// 	{ gate: 1, source: 0, drain: 2 },
// 	]

// var tc =[ 
// 		{ gate: 0, source: 0, drain: 2, eval: 1 },
// 		{ gate: 1, source: 0, drain: 4, eval: 1 },
// 		{ gate: 2, source: 2, drain: 4, eval: 1 },
// 		{ gate: 3, source: 2, drain: 4, eval: 1 },
// 		{ gate: 4, source: 2, drain: 6, eval: 1 },
// 		{ gate: 5, source: 4, drain: 6, eval: 1 },
// 		{ gate: 6, source: 4, drain: 7, eval: 1 },
// 		{ gate: 7, source: 6, drain: 7, eval: 1 } ];



//  var t = sim.getOutputOf(tc)

// console.log(JSON.stringify(t))


//startEvolution(t)


module.exports = {startEvolution}