var {batchCrosover,sortBatch,generateCase,generateBatch,crossover,testFitness,fitness} = require("./gene")

var size = 50;
var batchSize = 200000;

var target = "00100110110010100110010100010100011100101100110110"


//var c1 = generateCase();

//testFitness(c1,target);

var gen1 = generateBatch(batchSize,size);

var topGen1 = sortBatch(gen1 , target);


// first cross
var crossed =  batchCrosover(topGen1);
var cx1 = sortBatch(crossed , target);



// repeated cross

var bestSamples = [];

for (var i = 0; i < 10; i++) {
	
	crossed =  batchCrosover(cx1);
	cx1 = sortBatch(crossed , target);

	console.log(cx1[cx1.length-1])

	//bestSamples.push(cx1[cx1.length-1]);

}


// console.log(topGen1.slice( topGen1.length-21 ,topGen1.length-1))
// console.log()
// console.log(cx1.slice( cx1.length-21 ,cx1.length-1))


