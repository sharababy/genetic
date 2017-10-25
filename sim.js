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

        var first = {};

        first.gate = parseInt(Math.random()*10000)%(n);

        inputs.splice(inputs.indexOf(first.gate),1);

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
        inputs.splice(inputs.indexOf(gene.gate),1);
        //select random source from possible sources
        gene.source = possibleSource[ parseInt(Math.random()*10000)%(possibleSource.length) ];
        //select random drain except for current source
        
        gene.drain = anythingExcept( [gene.source] , n+1 );

        chromosome.push(gene);

    }

    return chromosome
}


function checkValidity(circuit){

    for (var i = 0; i < circuit.length; i++) {
        
    	if(circuit[i].source > circuit[i].drain){
    		console.log("invalid")

            return -1;
    	}
    }    

    return 1;
}

function checkConnectivity(circuit){

    var maxDrains = []
    var found = 0;

    for (var i = circuit.length; i > 0 ; i--) {
        
        for (var j = 0; j < circuit.length; j++) {
            
            if (circuit[j].drain === i) {

                maxDrains.push(circuit[j]);
                found = 1;
            }
        }

        if (found === 1) {
            break;
        }
    }

    // console.log("Elements with max drain")
    // console.log(maxDrains);

    var start = 0 , end = maxDrains[0].drain;

    return traverseCircuit(circuit, start, end)


}
    
function traverseCircuit(circuit, start, end){

    for (var i = 0; i < circuit.length; i++) {
            
        var e = circuit[i];

        if (e.drain !== end) {
            
            var p = findInSource(e.drain , circuit)

            if (p.length === 0) {
                return -1;
            }
            else{
                var connection = traverseCircuit(p, p[0].source , end);

                if (connection === -1) {
                    return -1;
                }
            }
        }
        else{
            continue
        }
    }

    return 1;
}

function findInSource(drain , circuit){

    var path = [];

    for (var i = 0; i < circuit.length; i++) {
        
        if (circuit[i].source === drain) {
            path.push(circuit[i])
        }
    }

    return path;
}

//for(var i=0; i<10;i++){
        //console.log(checkValidity(makeCircuit(3)))
//}
    var c = makeCircuit(4)

    while(checkValidity(c) === -1 || checkConnectivity(c) === -1){
        c = makeCircuit(4)
    }

    console.log(c)
    console.log()

module.exports = {getInputTable}
