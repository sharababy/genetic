//yutikaLovesVedant.js

'use strict'

function getInputTable(n){
	
    var result = [];

    for(var y=0; y < Math.pow(2,n); y++){    
        var combo = [];
        for(var x=0; x<n; x++){
            if((y >> x) & 1)
                combo.push(1);
             else 
                combo.push(0);
        }
        result.push(combo);
    }
    return result;
}

function anythingExcept(array,max){

    var random = parseInt(Math.random()*1000)%max;

    for (var i = 0; i < array.length; i++) {
        
        if (array[i] === random) {
            return anythingExcept(array,max);
        }
    }

    return random;
}

function selectRandomlyFrom(array){

    var index = parseInt(Math.random()*10000)%(array.length);

    return array[index];
}

function makeCircuit(n){

	var chromosome = [];
    var nodes = [];
    var inputs = [];

    var possibleSource = [];

    var possibleDrain = [];

    // [ {gate:a , source:3 , drain :2 } ]

    // select source from already selected nodes
    // select drain from any except the source node

    for (var i = 0; i < n; i++) {
        // set up list of inputs
        inputs.push(i);
    }
    for (var i = 0; i < n+1; i++) {
        // set up list of nodes
        nodes.push(i);
    }

    /* First Node */

        var first = {}

        first.gate = parseInt(Math.random()*10000)%(n);

        inputs.splice(first.gate,1);

        first.source = 0;

        possibleSource.push(first.source);

        first.drain = anythingExcept([0],n+1);

        possibleSource.push(first.drain);

        chromosome.push(first);
    /* End First Node */


    for (var i = 0; i < n-1; i++) {
        // for every chromosome

        
        var gene = {};
        //select random input
        gene.gate = selectRandomlyFrom(inputs);
        //remove the selected input from possible inputs
        inputs.splice(gene.gate,1);
        //select random source from possible sources
        gene.source = possibleSource[ parseInt(Math.random()*10000)%(possibleSource.length) ];
        //select random drain except for current source
        
        gene.drain = anythingExcept( [gene.source] , n+1 );

        chromosome.push(gene);

    }

    return chromosome
}


var circuit  = makeCircuit(3);

console.log(circuit)

module.exports = {getInputTable}