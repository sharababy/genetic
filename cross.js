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


function getBatchFitness(batch){

	for (var i = 0; i < batch.length; i++) {
		
		batch[i]
	}

}

var batch = sim.getBatch(1,2)

console.log(batch)








