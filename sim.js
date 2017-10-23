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

function makeCircuit(n){

	
}

module.exports = {getInputTable}