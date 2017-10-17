'use strict'

var size = 35;
var batchSize = 100;

var target = "01001110010100100100100100100011110"

function fitness(actual , target){

	var score = 0;

	for (var i = 0; i <= size; i++) {
		
		if (actual[i] == target[i]) {
			score += 10;
		}
	}

	return score;
}

function generateCase(){

	var candidate = [];

	for (var i = 0; i < size; i++) {
		candidate = candidate+ ( parseInt(Math.random()*10)%2) ;
	}

	return candidate;
	//console.log(candidate);
}

var c1 = generateCase();

function testFitness(actual,target){

	var score = fitness(actual,target);

	console.log(target)
	console.log(actual,"Fitness: ",score)

	return score;
}


testFitness(c1,target);

var batch = [];

for (var i = 0; i < batchSize ;i++) {
	
	batch.push(generateCase())

}

var max = 0;

for (var i = 0; i < batch.length; i++) {
	
	var sample = testFitness( batch[i],target )

	if (sample >= max) {

		max = sample;
	}

}

console.log("Max fitness: ",max);