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


var t = sim.getOutputOf(
		[{
			gate:0 , source :0 ,drain:1
		},
		{
			gate:1, source :0 ,drain:1
		},
		{
			gate:2 , source :1 ,drain:2
		},
		{
			gate:3 , source :2 ,drain:3
		}]

		)


function getBatchFitness(batch){

	var target = t;
		
	for (var i = 0; i < batch.length; i++) {
		batch[i].score = fitness(batch[i].output , target)
	}
	return batch
}


function mutate(circuit){


}


var batch = sim.getBatch(1000,4)

var batchWithScores = getBatchFitness(batch)

var max = 0;

for (var i = 0; i < batchWithScores.length; i++) {
	if (max < batchWithScores[i].score) {
		max = batchWithScores[i].score
	}
	if (batchWithScores[i].score === 16) {
		console.log(batchWithScores[i].circuit)	
	}
}	

console.log(max)







