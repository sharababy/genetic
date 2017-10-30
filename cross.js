//cross.js

var sim = require('./sim.js')



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

var tc = [ { gate: 0, source: 0, drain: 1 },
  { gate: 1, source: 1, drain: 2 },
  { gate: 2, source: 1, drain: 2 },
  { gate: 3, source: 2, drain: 3 } ]

var t = sim.getOutputOf(tc)


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
	

	if (mType === 0 || mType === 1) {

		
		var c = sim.getDuplicatePairs(circuit)

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
				var allNodes = sim.getAllNodes(circuit)
				circuit[gateIndex].source = sim.selectRandomlyFrom(allNodes)
				circuit[gateIndex].drain = sim.selectRandomlyFrom(allNodes)

				while(circuit[gateIndex].drain <= circuit[gateIndex].source){
					circuit[gateIndex].source = sim.selectRandomlyFrom(allNodes)
					circuit[gateIndex].drain = sim.selectRandomlyFrom(allNodes)
				}
			}
			else if(mType == 1){
				var maxDrains = sim.getMaxDrains(circuit)

				if (maxDrains[0].drain !== circuit.length) {
					circuit[gateIndex].source = maxDrains[0].drain;
					circuit[gateIndex].drain = circuit[gateIndex].source+1;
				}
			}
		}

		return circuit
		
	}

	else if(mType === 1){

		console.log("Working on it...")
	}

}



// var batch = sim.getBatch(100000,4)

// var batchWithScores = getBatchFitness(batch)

// var max = 0;

// for (var i = 0; i < batchWithScores.length; i++) {
// 	if (max < batchWithScores[i].score) {
// 		max = batchWithScores[i].score
// 	}
// 	if (batchWithScores[i].score === 16) {
// 		console.log(batchWithScores[i].circuit)	
// 	}
// }	

// console.log(max)



function achieveTarget(t , iterations , rounds){

	var batch = []

	for (var j = 0; j < iterations; j++) {
			
		var sample = {}
		sample.id = j;
		sample.circuit = sim.getCircuitOfSize(parseInt(Math.log2(t.length)))
		sample.output = sim.getOutputOf(sample.circuit)
		sample.score = fitness(sample.output , t)

		batch.push(sample)
	}

	for (var i = 0; i < rounds-1; i++) {
		
		for (var j = 0; j < iterations; j++) {
			
			var sample = {}
			sample.id = (iterations*(i+1))+j;
			sample.circuit = mutate(batch[(iterations*i)+j].circuit)
			sample.output = sim.getOutputOf(sample.circuit)
			sample.score = fitness(sample.output , t)

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

	//console.log(batch)
	
	return batch[index];
}

var best;

do{
	best = achieveTarget(t , 10 , 2)
	console.log(best)
}while(best.score != t.length)


