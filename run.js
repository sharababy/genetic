var {batchCrosover,sortBatch,generateCase,generateBatch,crossover,testFitness,fitness} = require("./gene")

var size = 20;
var batchSize = 100;

var target = "00101011001010010110"



//var c1 = generateCase();

//testFitness(c1,target);

var gen1 = generateBatch(batchSize,size);

var topGen1 = sortBatch(gen1 , target);

var crossed =  batchCrosover(topGen1);

var cx1 = sortBatch(crossed , target);


for (var i = 0; i < 5; i++) {
	
	crossed =  batchCrosover(cx1);

	cx1 = sortBatch(crossed , target);

	console.log(cx1[cx1.length-1])
}


// console.log(topGen1.slice( topGen1.length-21 ,topGen1.length-1))
// console.log()
// console.log(cx1.slice( cx1.length-21 ,cx1.length-1))


