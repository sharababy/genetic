
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

    var index = parseInt(Math.random()*100 + Math.random()*100+ Math.random()*100)%(array.length);
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

        first.gate = parseInt(Math.random()*100 + Math.random()*100 + Math.random()*100)%(n);

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
        gene.source = possibleSource[ parseInt(Math.random()*100 +Math.random()*100 +Math.random()*100 + Math.random()*100 + Math.random()*100)%(possibleSource.length) ];
        //select random drain except for current source

        gene.drain = anythingExcept( [gene.source] , n+1 );

        // eliminating the need for check validation function

        while(gene.source > gene.drain){
            gene.source = possibleSource[ parseInt(Math.random()*100 +Math.random()*100 +Math.random()*100)%(possibleSource.length) ];
            gene.drain = anythingExcept( [gene.source] , n+1 );
        }   

        if (possibleSource.indexOf(gene.drain) === -1) {
            possibleSource.push(gene.drain);    
        }

        chromosome.push(gene);

    }

    return chromosome
}

function getMaxDrains(circuit){

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

    return maxDrains
}

function checkConnectivity(circuit){

    var maxDrains = getMaxDrains(circuit)

    // console.log("Elements with max drain")
    // console.log(maxDrains);

    var paths = getDuplicatePairs(circuit)

    var start = 0 , end = maxDrains[0].drain;


    for (var i = 0; i < paths.length; i++) {

        var k = traverseCircuit(paths, circuit[i].source, end)

        if (k == -1) {
            return -1
        }

    }

    return 1;
}
    
function traverseCircuit(circuit, start, end){

        var e = findInSource(start , circuit);

        if (e[0].drain !== end) {
            
            var p = findInSource(e[0].drain , circuit)

            if (p.length === 0) {
                //console.log("This 1 source: ",start," drain: ",e[0].drain)
                return -1;
            }
            else{
                var connection = traverseCircuit(circuit, p[0].source , end);

                if (connection === -1) {
                    //console.log("This 2 source: ",start," drain: ",e.drain)
                    return -1;
                }
            }
        }
        else{
            return 1;
        }


}

function removeDuplicatesFrom(array){

    var distinct = [],repeated = 0;

    distinct.push(array[0])

    for (var i = 1; i < array.length; i++) {
        for (var j = i-1; j >= 0 ; j--) {
            
            if (array[i] === array[j]) {
                repeated = 1;
                break;
            }
        }

        if (repeated === 0) {
            distinct.push(array[i])
        }
        repeated = 0;
    }

    return distinct
}



function getAllNodes(circuit){

    var nodes = [];

    for (var i = 0; i < circuit.length; i++) {
        nodes.push(circuit[i].source)
        nodes.push(circuit[i].drain)
    }
    nodes = removeDuplicatesFrom(nodes)

    return nodes;
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


function findIn(array, element){
    var location = [];
    for (var i = 0; i < array.length; i++) {
        if( array[i].drain === element.drain && array[i].source === element.source ){
            location.push(i);
        }
    }

    return location;
}

function existsIn(array, e ){

    for (var i = 0; i < array.length; i++) {
        if(array[i] === e){
            return 1
        }
    }

    return 0;
}   

function getDuplicatePairs(circuit){

    var counts = [];
    var visited = [];
    var original = circuit.slice();

    for (var i = 0; i < circuit.length; i++) {
        
        if( existsIn(visited , i) === 0){
            var l = Object.assign({},original[i])
            l.location = findIn(original, original[i])
            visited = visited.concat(l.location)
            counts.push(l)
        }

    }

    /*
    Sample Output:
    [ { gate: 0, source: 0, drain: 1, location: [ 0, 1 ] },
      { gate: 2, source: 1, drain: 2, location: [ 2 ] },
      { gate: 3, source: 2, drain: 3, location: [ 3 ] } ]
    */
    
    return counts;
}


function getGateLocation(circuit,gate){

    for (var i = 0; i < circuit.length; i++) {
        
        if (circuit[i].gate === gate) {
            return i
        }
    }

    return -1
}


function getElemetsWithSource(circuit, startNode){

    var elements = []; 
    for (var i = 0; i < circuit.length; i++) {
        if (circuit[i].source === startNode && circuit[i].eval === 1) {
            elements.push(circuit[i])
        }
    }

    return elements
}

function findOutputPathIn(circuit,startNode,endNode){

    var elements = getElemetsWithSource(circuit,startNode)
    var currentOp = 1;
    if (elements.length === 0) {
        return 0
    }

    for (var i = 0; i < elements.length; i++) {
        
        if (elements[i].drain === endNode) {
            return 1
        }
        else if(elements[i].drain !== endNode){
            var retVal = findOutputPathIn(circuit,elements[i].drain,endNode)

            if (retVal === 1) {
                return 1
            }
            else if(retVal === 0){
                currentOp = retVal
            }
        }   
    }

    return currentOp;
}

function getOutputOf(circuit){

    var inputSet = getInputTable(circuit.length)
    var copy = {};
    var outputSet = [];

    for (var i = 0; i < inputSet.length; i++) {

        copy = circuit
        for (var j = 0; j < inputSet[i].length; j++) {
            if (inputSet[i][j] === 0) {
                copy[getGateLocation(copy,j)].eval = 0;
            }
            else{
                copy[getGateLocation(copy,j)].eval = 1;   
            }
        }

        // console.log(inputSet[i])
        // console.log(copy)

        var end = getMaxDrains(circuit)[0].drain
        var output = findOutputPathIn(copy,0,end);

        //console.log(inputSet[i] , output)
        outputSet.push(output)
    }

    return outputSet
}

function getCircuitOfSize(n){

    var c = makeCircuit(n)
    var ll = 0;
    while(checkConnectivity(c) === -1){
        ll++;
        c = makeCircuit(n)
    }
    //console.log(ll)

    return c
}
    

function getBatch(n,size){

    var batch = [];
    for (var i = 0; i < n; i++) {
        var sample = {}
        sample.circuit = getCircuitOfSize(size)
        sample.output = getOutputOf(sample.circuit)        
        batch.push(sample)
    }

    return batch
}

//var c = getCircuitOfSize(15)
//console.log(c)
//getOutputOf(c)


// var t = [ 
//     { gate: 0, source: 0, drain: 1 },
//     { gate: 1, source: 0, drain: 1 },
//     { gate: 2, source: 1, drain: 2 },
//     { gate: 3, source: 1, drain: 3 },
//     ]

// console.log(checkConnectivity(t))

module.exports = {getMaxDrains,checkConnectivity,getCircuitOfSize,getBatch,getOutputOf,getDuplicatePairs,getGateLocation,anythingExcept,getAllNodes,selectRandomlyFrom}
