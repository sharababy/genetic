'use strict'

function fitness(actual , target){

	var score = 0;

	for (var i = 0; i < actual.length; i++) {
		
		if (actual[i] == target[i]) {
			score++;
		}
	}

	return score;
}

function generateCase(size){

	var candidate = [];

	for (var i = 0; i < size; i++) {
		candidate = candidate+ ( parseInt(Math.random()*10)%2) ;
	}

	return candidate;
	//console.log(candidate);
}



function testFitness(actual,target){

	var score = fitness(actual,target);

	console.log(target)
	console.log(actual,"Fitness: ",score)

	return score;
}


function crossover(c1,c2){

	var size = (c1.length);
	var switchPoint = parseInt((Math.random()*1000))%size;

	var cx = "";

	for (var i = 0; i < switchPoint; i++) {
		
		cx = cx + c1[i];
	}

	for (var i = switchPoint; i < size; i++) {
		
		cx = cx + c2[i];
	}

	return cx;

}


function generateBatch(batchSize , size){

	var batch = [];

	for (var i = 0; i < batchSize ;i++) {
		
		batch.push(generateCase(size))

	}


	return batch;
}

function sortBatch(batch , target){

	var max = 0;

	var sorted = [];

	for (var i = 0; i < batch.length; i++) {
		var m = {}

		m.score = fitness(batch[i],target);

		m.sample = batch[i]

		sorted.push(m)
		
	}

	sorted.sort(function(a,b){return a.score-b.score})

	return sorted;
}

function batchCrosover(batch){

	var crossed = [],next;

	for (var i = 0; i < batch.length-1; i++) {
		
		// next = (i+1 === batch.length) ? 0 : i;
		crossed.push(crossover( batch[i].sample , batch[i+1].sample));
		//crossed.push(crossover( batch[i].sample , batch[parseInt((Math.random()*1000))%(batch.length-1)].sample));
	}

	return crossed;
}


function mutation(sample){

	var index = parseInt(Math.random()*1000)%(sample.length)

	if (sample[index] === 1) {

		sample[index] = 0;
	}
	else{
		sample[index] = 1;
	}

	return sample
}


function shouldMutate(){

	return parseInt(Math.random()*100)%2;
}

function startEvolution(batchSize,size,target){

	var gen1 = generateBatch(batchSize,size);
	var topGen1 = sortBatch(gen1 , target);

	// first cross
	var crossed =  batchCrosover(topGen1);
	var cx1 = sortBatch(crossed , target);

	// repeated cross
	while(cx1[cx1.length-1].score !== size){
		crossed =  batchCrosover(cx1);
		cx1 = sortBatch(crossed , target);
		console.log(cx1[cx1.length-1])
	}
}


module.exports = {mutation,generateCase,generateBatch,crossover,testFitness,fitness,sortBatch,batchCrosover,startEvolution}